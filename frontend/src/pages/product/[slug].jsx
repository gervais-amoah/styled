import { useQuery } from 'urql';

import {
  DetailsStyle,
  ProductImage,
  ProductInfo,
  Quantity,
  Buy,
} from '@/styles/ProductDetails';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { GET_PRODUCT_QUERY } from 'lib/query';
import { useRouter } from 'next/router';
// import { useStateContext } from 'lib/context';
// import { UserContext, TypeContext } from "./Home";
import { ShopContext } from 'lib/context';
import { useContext, memo } from 'react';

let count = 0;

const ProductDetails = memo(() => {
  const { setShowCart, qty, increaseQty, decreaseQty, onAdd } =
    useContext(ShopContext);

  // const { qty, increaseQty, decreaseQty } = useStateContext();
  // console.log(qty);
  console.log('function called', count++);

  // Get product slug
  const router = useRouter();
  const { query } = router;

  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  //Extract Data
  const { title, description, image, price } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <ProductImage>
        <img src={image.data.attributes.formats.medium.url} alt={title} />
      </ProductImage>
      <ProductInfo>
        <h2>{title}</h2>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            // setShowCart(true);
            // notify();
          }}
        >
          Add To Cart - ${price * qty}
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
});

export default ProductDetails;
