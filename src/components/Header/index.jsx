import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import walletAddressLogada from "../../utils/walletAddressLogada"
import { useRecoilState } from "recoil"
import { walletAddressState } from "../../recoil/walletAtom"

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
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const Header = ({ layout }) => {
    const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState)

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
            
            // Verifica se já está na rede Paseo
            const chainIdAtual = await window.ethereum.request({ method: "eth_chainId" })

            if (chainIdAtual !== chainIdPasseo) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: chainIdPasseo }],
                    })
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: chainIdPasseo,
                                        chainName: "Paseo PassetHub",
                                        rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
                                        nativeCurrency: {
                                            name: "PAS",
                                            symbol: "PAS",
                                            decimals: 18,
                                        },
                                        blockExplorerUrls: ["https://explorer.passeo.io"],
                                    },
                                ],
                            })

                            // Após adicionar, tenta trocar para ela
                            await window.ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: chainIdPasseo }],
                            })
                        } catch (addError) {
                            handleError(addError, "Erro ao adicionar a rede Paseo ao MetaMask")
                            return
                        }
                    } else {
                        handleError(switchError, "Troca de rede recusada. Conecte à rede Paseo para continuar")
                        return
                    }
                }
            }
        }

    }

    const handleError = (error, fallbackMessage) => {
        let message = fallbackMessage
        if (error.code === 4001) {
            message = "Solicitação rejeitada pelo usuário."
        } else if (error.reason) {
            message = error.reason
        } else if (error.message) {
            message = error.message
        }
        console.error("Erro MetaMask:", error)
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
