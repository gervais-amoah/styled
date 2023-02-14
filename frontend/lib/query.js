export const PRODUCT_QUERY = `
  query getProducts {
    products {
      data {
        id
        attributes {
          title
          description
          slug
          price
          image {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {slug :{eq: $slug}}){
    data{
      attributes{
        title
        slug
        description
        price
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;
