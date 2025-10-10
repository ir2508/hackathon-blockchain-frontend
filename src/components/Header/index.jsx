import { NavLink } from "react-router-dom"
import styled from "styled-components"

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F0F1F2;
    box-shadow: 2px 2px 5px #ccc;

    /* box-sizing: border-box; */
    width: 100vw;
    max-height: 150px;
    padding: 25px 80px;

    h1 {
        font-size: 2em;
    }
`

const MenuNavegacao = styled.nav`
    display: flex;
    gap: 30px;
`

const Header = () => {
    return (
        <HeaderStyled>
            <h1>Logichain</h1>
            <MenuNavegacao>
                <NavLink to={"/"}>Monitoramento</NavLink>
                <NavLink to={"/cadastro-caminhao"}>Cadastrar meu caminhão</NavLink>
                <NavLink to={"/seja-distribuidor"}>Quero ser um distribuidor</NavLink>
            </MenuNavegacao>
            <div>
                Teste
                {/* Retorno da chave pública */}
            </div>
        </HeaderStyled>
    )
}

export default Header
