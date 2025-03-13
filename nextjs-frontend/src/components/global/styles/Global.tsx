import { createGlobalStyle } from "styled-components";
import { ThemeColors } from "@/config";

export interface StyleProps {
    colors: ThemeColors;
}

// ✅ Define a default theme to use when `colors` is undefined
const defaultTheme: ThemeColors = {
    red: "#9580ad",
    pastel: "#595f39",
    buttonColor: "var(--darkgrey)", // Ensure it matches your theme
    headerBgColour: "#595f39",
    navBgColour: "#595f39",
    buttonBg: "#595f39",
};

export const GlobalStyles = createGlobalStyle<StyleProps>`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        --red: ${(props) => props.colors?.red || defaultTheme.red};
        --redlight: #D62828;
        --lightgrey: #EDF2F4;
        --mediumgrey: #495057;
        --grey: #495057;
        --pastel: ${(props) => props.colors?.pastel || defaultTheme.pastel};
        --orange: #D29A78;
        --black: #333252; /*#01A487;*/
        --green: #01A487;
        --darkgrey: #485C5B;
        --white: #F6F2DF;
        color: var(--grey);
        font-family: "Tenor Sans", sans-serif;
        font-weight: normal;
    }

    button {
        font-size: 1rem;
        background-color: var(--pastel);
        border: none;
        cursor: pointer;
        color: ${(props) => props.colors?.buttonColor || defaultTheme.buttonColor};
        padding: 10px;
        border-radius: 3px;
    }

    .loading {
        position: absolute;
        left: 50%;
        top: 50vh;
    }

    .very-small {
        font-size: 8px;
    }

    picture img {
        max-width: 100%;
        height: auto;
        display: block; /* Prevent inline-block spacing issues */
    }
`;
