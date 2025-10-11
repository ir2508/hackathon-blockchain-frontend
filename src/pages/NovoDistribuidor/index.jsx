import styled from "styled-components"
import { ethers } from "ethers"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { walletAddressState } from "../../recoil/walletAtom"
import ModalMetamask from "../../components/ModalMetamask"
import handleMetamaskError from "../../utils/handleMetamaskError"

const contratoABI = ["function registrarComoAdministradora() public"]
const contratoEndereco = "0x0E2E739DC04AfE340106F74672F019A469F6C226"

const ContainerPrincipalStyled = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
`

const NovoDistribuidor = () => {
    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const walletAddress = useRecoilValue(walletAddressState)

    const handleCadastrarDistribuidora = async (e) => {
        e.preventDefault()
        setMetamaskInfo({
            mensagemRetorno: "Aguardando ação do usuário ...",
        })

        try {
            if (!window.ethereum) {
                setMetamaskInfo({
                    mensagemRetorno: "MetaMask não está disponível",
                })
                return
            }

            if (!walletAddress) {
                setMetamaskInfo({
                    mensagemRetorno: "Priemeiro conecte a MetaMask para continuar",
                })
                return
            }

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            try {
                const tx = await contrato.registrarComoAdministradora()
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Distribuidora registrada com sucesso!",
                })
            } catch (txError) {
                handleMetamaskError(txError, "Erro ao registrar distribuidora", setMetamaskInfo)
            }
        } catch (error) {
            handleMetamaskError(error, "Erro inesperado", setMetamaskInfo)
        }
    }

    return (
        <ContainerPrincipalStyled>
            <h2>Quero ser um distribuidor</h2>
            <button
                type="button"
                className="btn btn-success mt-5"
                onClick={handleCadastrarDistribuidora}
                data-bs-toggle="modal"
                data-bs-target="#loginMetamask"
            >
                Cadastrar minha distribuidora
            </button>

            <ModalMetamask mensagem={metamaskInfo.mensagemRetorno}  id="loginMetamask" />
        </ContainerPrincipalStyled>
    )
}

export default NovoDistribuidor
