import styled from 'styled-components';

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 25rem);
  /* margin-top: 5rem; */
  margin-top: 2rem;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ProductImage = styled.div`
  padding: 3rem 2rem;
  /* display: flex; */
  border: 5px solid var(--primary);
  width: 35%;
  height: auto;
  @media only screen and (max-width: 1024px) {
    width: 50%;
  }
  @media only screen and (max-width: 900px) {
    margin-bottom: 3rem;
    width: 100%;
  }
  div {
    padding-top: 130%;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
