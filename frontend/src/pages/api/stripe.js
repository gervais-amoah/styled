import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

const COUNTRIES = ['US', 'GH', 'NG', 'TG', 'CA', 'NE', 'CI', 'BE', 'BF', 'ZA'];
const SHIPPING_1 = 'shr_1MblWAIkclH68scY4dMpVVwI';
const SHIPPING_2 = 'shr_1MbmCoIkclH68scYcK6pvRCp';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const user = session?.user;
  console.log('user from stripe?', session);

  if (user) {
    const stripeId = user['http://localhost:3000/stripe_customer_id'];

    if (req.method === 'POST') {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          customer: stripeId,
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: COUNTRIES,
          },
          shipping_options: [
            { shipping_rate: SHIPPING_1 },
            { shipping_rate: SHIPPING_2 },
          ],
          allow_promotion_codes: true,
          line_items: req.body.map(item => {
            return {
              price_data: {
                currency: 'xof',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.small.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            };
          }),

          // REDIRECT TO SUCCESS PAGE
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/`,
        });
        res.status(200).json(session);
      } catch (error) {
        console.error('@@@@', error);
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  } else {
    if (req.method === 'POST') {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: COUNTRIES,
          },
          shipping_options: [{ shipping_rate: SHIPPING_2 }],
          allow_promotion_codes: true,
          line_items: req.body.map(item => {
            return {
              price_data: {
                currency: 'xof',
                product_data: {
                  name: item.title,
                  images: [item.image.data.attributes.formats.small.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            };
          }),

          // REDIRECT TO SUCCESS PAGE
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/`,
        });
        res.status(200).json(session);
      } catch (error) {
        console.error('@@@@', error);
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }
}
