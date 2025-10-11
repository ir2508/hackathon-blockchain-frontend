import Input from "../Input"
import { useState } from "react"
import { ethers } from "ethers"
import { useRecoilValue } from "recoil"
import { walletAddressState } from "../../recoil/walletAtom"
import ModalMetamask from "../../components/ModalMetamask"
import handleMetamaskError from "../../utils/handleMetamaskError"

const contratoABI = [
    "function cadastrarMeuCaminhao(string placa) public",
]

const contratoEndereco = "0xA127207F272d19bec252f7f55110E7295d41d8c4"

const FormAddCaminhao = () => {
    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const walletAddress = useRecoilValue(walletAddressState)

    const [placa, setPlaca] = useState("")

    const handleChange = (e) => {
        setPlaca(e.target.value)
    }

    const handleAddCaminhao = async (e) =>{
        e.preventDefault()

        setMetamaskInfo({
            mensagemRetorno: "Aguardando ação do usuário ...",
        })

        if (!placa || placa.trim() === "") {
            setMetamaskInfo({
                    mensagemRetorno: "Placa inválida ou não informada.",
                })
            return
        }

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

            // Solicita conexão com a carteira
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            try {
                const tx = await contrato.cadastrarMeuCaminhao(placa)
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Caminhão registrado com sucesso!",
                })
            } catch (txError) {
                handleMetamaskError(txError, "Erro ao registrar caminhão", setMetamaskInfo)
            }

        } catch (error) {
            handleMetamaskError(error, "Erro inesperado", setMetamaskInfo)
        }


    }

    return (
        <>
            <form>
                <Input label="Placa" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} />
                <button
                    type="button"
                    className="btn btn-success mt-5"
                    onClick={handleAddCaminhao}
                    data-bs-toggle="modal"
                    data-bs-target="#loginMetamask"
                >
                    Cadastrar novo caminhão
                </button>
            </form>

            <ModalMetamask mensagem={metamaskInfo.mensagemRetorno}  id="loginMetamask" />
        </>
    )

}

export default FormAddCaminhao
