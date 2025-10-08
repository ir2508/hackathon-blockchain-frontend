import styled from "styled-components"

const BotaoStyled = styled.button`
    font-weight: 400;
    font-size: 1em;
    width: ${({ largura }) => largura || "auto"};
`

const Botao = ({ children, classBootstrap, onClick, largura }) => {
    return (
        <BotaoStyled largura={largura} className={`btn ${classBootstrap}`} onClick={onClick}>
            {children}
        </BotaoStyled>
    )
}

export default Botao
