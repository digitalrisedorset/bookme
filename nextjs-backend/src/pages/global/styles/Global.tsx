import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /*
    https://coolors.co/eae2b7
    MAIN COLOR: #E63946  hover: #2C3F7C
    GREY COLOR: #495057
    ACCENT COLOR: #1D3557
    
    type-scale.com
    SPACING STSTEM (px)
    2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
    
    FONT SYSTEM (px)
    10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
    
    strong: orange
    second: blue
    
    */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        --red: #f77f00;
        --redlight: #D62828;
        --lightgrey: #EDF2F4;
        --mediumgrey: #495057;
        --grey: #495057;
        --black: #dda15e;
        --darkgrey: #edede9;
        --white: #F6F2DF;
        color: var(--grey);
        font-family: "Tenor Sans", sans-serif;
        font-weight: normal;
    }
    
    button {
        font-size: 1rem;
        background-color: var(--black);
        border: none;
        cursor: pointer;
        color: white;
        padding: 10px;
        border-radius: 3px;
    }
`;