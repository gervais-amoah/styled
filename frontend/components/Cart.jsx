import { useStateContext } from 'lib/context';
import {
  CartStyle,
  Card,
  EmptyStyle,
  CartWrapper,
  CardInfo,
  Checkout,
  CardImage,
} from '@/styles/CartStyles';
import { Quantity } from '@/styles/ProductDetails';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export default function Cart() {
  const { onAdd, onRemove, cartItems, setShowCart, totalPrice } =
    useStateContext();

  const increaseItemQty = item => {
    item.quantity++;
  };

  return (
    <div>
      <CartWrapper onClick={() => setShowCart(false)}>
        <CartStyle onClick={evt => evt.stopPropagation()}>
          {cartItems.length < 1 && (
            <EmptyStyle>
              <h1>You have more shopping to do 😉</h1>
              <FaShoppingCart />
            </EmptyStyle>
          )}
          {cartItems.length >= 1 &&
            cartItems.map(item => {
              console.log(item);
              return (
                <Card key={item.slug}>
                  <CardImage>
                    <img src={item.image.data.attributes.formats.small.url} />
                  </CardImage>
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>${item.price}</h3>

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
          <Checkout>
            {cartItems.length >= 1 && (
              <div>
                {/* <h3>Subtotal</h3> */}
                <button>Purchase - ${totalPrice}</button>
              </div>
            )}
          </Checkout>
        </CartStyle>
      </CartWrapper>
    </div>
  );
}

/*
HAAAAA

            */
