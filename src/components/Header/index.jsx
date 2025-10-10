import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import walletAddressLogada from "../../utils/walletAddressLogada"

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

    // Verifica se já está autorizado
    useEffect(() => {
        async function checkWalletConnection() {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_accounts" })
                if (accounts.length > 0) {
                    const address = await walletAddressLogada.getWalletAddress()
                    setWalletAddress(address)
                }
            }
        }

        checkWalletConnection()
    }, [])

    const handleConnectWallet = async () => {
        const address = await walletAddressLogada.getWalletAddress()
        if (address) {
            setWalletAddress(address)
        }
    }

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

                    <div>
                        {walletAddress ? (
                            <>Endereço conectado: {walletAddress}</>
                        ) : (
                            <button onClick={handleConnectWallet}>Conectar carteira</button>
                        )}
                    </div>
                </>
            )}
        </HeaderStyled>
    )
}

export default Header
