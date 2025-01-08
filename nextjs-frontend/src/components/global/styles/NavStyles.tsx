import styled from 'styled-components';

const NavStyles = styled.menu`
    background-color: var(--black);
    color: #fff;
    grid-column: 2 / -1;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 0 40px;

    a, button {
        display: inline-block;
        font-size: 16px;
        background-color: var(--mediumgrey);
        border: none;
        cursor: pointer;
        color: white;
        padding: 8px 12px;
        text-decoration: none;
    }

    button:last-child {
        background-color: var(--red);
        margin-left: auto;
    }
    button span {
        position: absolute;
    }
    @media (max-width: 600px) {
        a, button {
            font-size: 1.8rem;
        }
        
    }
`;


export default NavStyles;