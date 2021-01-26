import styled from "styled-components";

const Carrousel = styled.div`
    // Para poner la scrollbar arriba 
    transform: rotateX(180deg);
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    border-color: rgba(0, 0, 0, 0.0);
    transition: border-color 0.5s linear;
    &:hover {
        border-color: rgba(0, 0, 0, 0.1);
        transition: border-color 0.125s linear;
    }

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-corner {
        border-radius: 10px;
        border-right-style: inset;
        border-right-width: calc(100vw + 100vh);
        border-color: inherit;
    }

    &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        border-color: inherit;
    }
​
`

export default Carrousel;