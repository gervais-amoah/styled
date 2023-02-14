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
import { useStateContext } from 'lib/context';

export default function ProductDetails() {
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();
  console.log(qty);

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
  const { title, description, image } = data.products.data[0].attributes;

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
            // notify();
          }}
        >
          Add To Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
