import styled from 'styled-components';

export const OrderItemStyles = styled.dd`
  box-shadow: var(--bs);
  list-style: none;
  padding: 2rem;
  border: 1px solid var(--offWhite);
  h2 {
    border-bottom: 2px solid var(--red);
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: 2fr 1fr;
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
    div {
        text-align: left;
        padding: 1rem;
    }  
      h3 {
          font-weight: bold;
          margin-bottom: 1rem;
      }
  }
`;

export const OrderDl = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
`;
