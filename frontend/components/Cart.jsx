import { useStateContext } from 'lib/context';
import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
  Checkout,
  CardImage,
  Cards,
} from '@/styles/CartStyles';
import { Quantity } from '@/styles/ProductDetails';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import getStripe from 'lib/getStripe';
import { CURRENCY } from 'lib/query';

// Animation Variants
const cardAnimate = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
  },
};
const cardsAnimate = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.2 } },
};

export default function Cart() {
  const { onAdd, onRemove, cartItems, setShowCart, totalPrice } =
    useStateContext();

  // STRIPE PAYMENT
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();
    console.log('DATA', data);
    // IntegrationError: stripe.redirectToCheckout: You must provide one of lineItems, items, or sessionId.
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <CartWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCart(false)}
      >
        <CartStyle
          initial={{ x: '50%' }}
          animate={{ x: '0%' }}
          transition={{ type: 'tween' }}
          onClick={evt => evt.stopPropagation()}
        >
          {cartItems.length < 1 && (
            <EmptyStyle
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1>You have more shopping to do 😉</h1>
              <FaShoppingCart />
            </EmptyStyle>
          )}

          <Cards layout variants={cardsAnimate} initial="hidden" animate="show">
            {cartItems.length >= 1 &&
              cartItems.map(item => {
                return (
                  <Card layout variants={cardAnimate} key={item.slug}>
                    <CardImage>
                      <img src={item.image.data.attributes.formats.small.url} />
                    </CardImage>
                    <CardInfo>
                      <h3>{item.title}</h3>
                      <h3>
                        {item.price} {CURRENCY}
                      </h3>

                      <Quantity>
                        <span>Quantity</span>
                        <button
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => onRemove(item)}
                        >
                          <AiFillMinusCircle />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => onAdd(item, 1)}
                        >
                          <AiFillPlusCircle />
                        </button>
                      </Quantity>
                    </CardInfo>
                    <hr />
                  </Card>
                );
              })}
          </Cards>
          <Checkout onClick={handleCheckout} layout>
            {cartItems.length >= 1 && (
              <div>
                {/* <h3>Subtotal</h3> */}
                <button>
                  Purchase - {totalPrice.toFixed(2)} {CURRENCY}
                </button>
              </div>
            )}
          </Checkout>
        </CartStyle>
      </CartWrapper>
    </div>
  );
}
