import styled from 'styled-components';

export const ProductStyle = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;
  h2 {
    padding: 0.5rem 0rem;
  }
`;

export const ProductImageStyle = styled.div`
  position: relative;
  width: 100%;
  padding-top: 150%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  /* border: 2px solid red; */

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    transition: filter 0.5s ease-in-out,
      scale 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  img:hover {
    filter: none;
    -webkit-filter: grayscale(0);
    scale: 1.2;
    transition: filter 0.7s ease-in-out,
      scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;
