import styled from "styled-components"

const BotaoStyled = styled.button`
    font-weight: 400;
    font-size: 1em;
`

const Botao = ({ children, classBootstrap, onClick }) => {
    return (
        <BotaoStyled className={`btn ${classBootstrap}`} onClick={onClick}>{children}</BotaoStyled>
    )
}

export default Botao