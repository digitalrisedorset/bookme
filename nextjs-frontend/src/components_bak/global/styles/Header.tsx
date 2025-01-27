import styled from "styled-components";
import {StyleProps} from "@/components/global/styles/Global";

const HeaderStyles = styled.nav<StyleProps>`
    position: relative;
    background-color: var(--${(props: StyleProps): string => props.colors?.headerBgColour?props.colors?.headerBgColour:'var(--darkgrey)' });
    color: #ffffff;
    grid-column: 1;
    grid-row: 1 / -1;
    logo {
        position: absolute;
        top: 10px;
        left:5px;
    }
`;

export default HeaderStyles;