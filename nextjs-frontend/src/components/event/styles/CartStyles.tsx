import styled from 'styled-components';

interface CartProps {
  open: boolean
}

export const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export const CartStyles = styled.aside<CartProps>`
  grid-column: 4 / -1;
  grid-row: 2;
  padding: 20px;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    /* display: grid;
    grid-template-columns: auto auto; */
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }

  @media (max-width: 600px) {
    min-width: 300px;
    footer {
      margin-top: 1rem;
      padding-top: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }
  }
`;

export const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

export const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  //margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  position: absolute;

  @media (max-width: 600px) {
    //padding: 1.4rem 1.6rem;
    min-width: 1rem;
    line-height: 1rem;
    right: 1.7rem;
    top: 10px;
  }
`;

export const AnimationStyles = styled.span`
  //position: absolute;
  .count {
    //display: block;
    //position: absolute;
  }
`;
