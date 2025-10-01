import styled from "styled-components"

const BotaoStyled = styled.button`
    font-weight: 400;
    font-size: 1em;
    margin-left: 20px;
`

const Botao = ({ children }) => {
    return (
        <BotaoStyled>{children}</BotaoStyled>
    )
}

export default Botao