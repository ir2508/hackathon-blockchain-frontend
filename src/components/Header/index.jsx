import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import walletAddressLogada from "../../utils/walletAddressLogada" // Importa o objeto com a função

const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f1f2;
    box-shadow: 2px 2px 5px #ccc;
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

const Header = ({ layout }) => {
    const [walletAddress, setWalletAddress] = useState("")

    useEffect(() => {
        async function fetchAddress() {
            const address = await walletAddressLogada.getWalletAddress()
            setWalletAddress(address)
        }

        fetchAddress()
    }, [])

    return (
        <HeaderStyled>
            <h1>Logichain</h1>
            {layout !== "publico" && (
                <>
                    <MenuNavegacao>
                        <NavLink to={"/"}>Monitoramento</NavLink>
                        <NavLink to={"/cadastro-caminhao"}>Cadastrar meu caminhão</NavLink>
                        <NavLink to={"/seja-distribuidor"}>Quero ser um distribuidor</NavLink>
                    </MenuNavegacao>

                    <div>Endereço conectado: {walletAddress || "Não conectado"}</div>
                </>
            )}
        </HeaderStyled>
    )
}

export default Header
