import styled from 'styled-components';
import {StyleProps} from "@/components/global/styles/Global";

export const NavStyles = styled.menu<StyleProps>`
    background-color: var(--${(props: StyleProps): string => props.colors?.navBgColour?props.colors?.navBgColour:'#595f39' });
    color: #fff;
    grid-column: 2 / -1;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 0 40px;
    position: relative;
    .venue-title {
        position: absolute;
        left: 30%;
        color: white;
        font-size: 1.7rem;
        background-color: var(--red);
        padding: 10px 20px;
        border-radius: 7px;
    }
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
        padding: 0 10px;
        gap: 10px;
        a, button {
            font-size: 1rem;
            padding:4px
        }
        .venue-title {
            font-size:1.0rem;
            left:50%;
            padding: 5px 5px;
            visibility: hidden;
        }        
    }
`;

export const CalendarStyles = styled.div`
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
`
