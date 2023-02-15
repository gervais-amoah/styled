import Link from 'next/link';
import { ProductStyle, ProductImageStyle } from '@/styles/ProductStyle';
import { CURRENCY } from 'lib/query';

export default function Product({ data }) {
  const { title, price, description, slug, image } = data;
  const imageUrl = image.data.attributes.formats.small.url;

  // title={productData.title}
  // description={productData.description}
  // slug={productData.slug}
  // price={productData.price}
  // imageUrl={productData.image.data.attributes.formats.thumbnail.url}

  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <ProductImageStyle>
          <img src={imageUrl} alt={title} />
        </ProductImageStyle>

        <h2>{title}</h2>
        <h3>
          {price} {CURRENCY}
        </h3>
      </Link>
    </ProductStyle>
  );
}
