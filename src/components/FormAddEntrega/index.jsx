import { useRecoilState } from "recoil"
import Botao from "../Botao"
import { useState } from "react"
import { placasCaminhoesState, caminhoesState } from '../../recoil/caminhoesAtom';
import { useRecoilValue } from "recoil"
import SelectPersonalizado from '../SelectPersonalizado';
import { ethers } from "ethers"
import { walletAddressState } from "../../recoil/walletAtom"
import ModalMetamask from "../../components/ModalMetamask"
import handleMetamaskError from "../../utils/handleMetamaskError"

const contratoABI = [
    "function cadastrarCarga(address chaveCaminhao) public",
]

const contratoEndereco = "0x8965c031D70e7aE4e7d33554374d1c655d87E8f2"

const FormAddEntrega = () => {

    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const walletAddress = useRecoilValue(walletAddressState)

    const formatarEndereco = (endereco) => {
        if (!endereco || endereco.length < 10) return endereco
        return `${endereco.slice(0, 6)}...${endereco.slice(-4)}`
    }

    const [listaCaminhoes] = useRecoilState(caminhoesState)

    const listaPersonalizada = listaCaminhoes.map(item => ({
        value: item.endereco,
        label: `${item.placaCaminhao} - ${formatarEndereco(item.endereco)}`
    }))


    const [endereco, setNovaEntrega] = useState("")

    const handleChange = (e) => {
        setNovaEntrega(e.target.value)
    }

    const handleAddEntrega = async (e) => {
        e.preventDefault()

        setMetamaskInfo({
            mensagemRetorno: "Aguardando ação do usuário ...",
        })

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

        try {

            // Solicita conexão com a carteira
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            try {
                // Chama a função do contrato com a placa
                const tx = await contrato.cadastrarCarga(endereco)
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Carga registrada com sucesso!",
                })
            } catch (txError) {
                handleMetamaskError(txError, "Erro ao cadastrar entrega", setMetamaskInfo)
            }

        } catch (error) {
            handleMetamaskError(error, "Erro inesperado", setMetamaskInfo)
        }
    }

    return (
        <>
            <h5 className="text-center">Cadastrar nova entrega</h5>
            <form className="mt-3">
                <SelectPersonalizado label="Placa do caminhão" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} conteudo={listaPersonalizada} />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddEntrega}
                    data-bs-toggle="modal"
                    data-bs-target="#loginMetamask"
                    style={{ width: "100%" }}
                >
                    Cadastrar nova entrega
                </button>
            </form>
            <ModalMetamask mensagem={metamaskInfo.mensagemRetorno}  id="loginMetamask" />
        </>
    )
}

export default FormAddEntrega
