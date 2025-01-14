import styled from 'styled-components';

const OrderStyles = styled.div`
    h2 {
        margin-bottom: 3rem;
    }
    fieldset {
       display: flex;
        text-align: left;
        label {
            font-weight: bold;
            width: 30%;
            text-align: left;
        }
        h3 {
            font-weight: bold;
            font-size: 1.3rem;
        }
        .items {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10%;
        }
        .order-reference {
            font-weight: bold;
        }
        .payment-reference {
            font-size: small;
        }
    }
`;
export default OrderStyles;


export const Section = styled.section`
    display: grid;
    grid-row: 2;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 40px;
    
    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    
    img {
        border-radius: 30px;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        h2 {
            font-size: 3rem;
        }
        p,h3 {
            font-size: 1.5rem;
        }
    }
`
