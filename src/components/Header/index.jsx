import { NavLink } from "react-router-dom"
import styled from "styled-components"

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F0F1F2;
    box-sizing: border-box;
    width: 100vw;
    max-height: 150px;
    padding: 10px 80px;
`

const MenuNavegacao = styled.nav`
    display: flex;
    gap: 30px;
`

const Header = () => {
    return (
        <HeaderStyled>
            <h1>..</h1>
            <MenuNavegacao>
                <NavLink to={"/"}>Monitoramento</NavLink>
                <NavLink to={"/cadastro-caminhao"}>Cadastrar Caminhão</NavLink>
                <NavLink to={"/cadastro-entrega"}>Cadastrar Entrega</NavLink>
                <NavLink to={"/aferir-temperatura"}>Aferir Temperatura</NavLink>
            </MenuNavegacao>
        </HeaderStyled>
    )
}

export default Header