import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from "recoil"
import Botao from "../Botao"
import Input from "../Input"
import { entregasState } from "../../recoil/entregasAtom"
import { useState } from "react"
import { placasCaminhoesState } from '../../recoil/caminhoesAtom';
import Select from '../Select';
import { ethers } from "ethers"

const contratoABI = [
    "function cadastrarCarga(address chaveCaminhao) public",
]

const contratoEndereco = "0x989De45fBE84E2E55E6A1ffC1EC4Fa56093958d7"
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const FormAddEntrega = () => {
    // const [listaEntregas, setListaEntregas] = useRecoilState(entregasState)
    const [listaPlacas] = useRecoilState(placasCaminhoesState)


    const [endereco, setNovaEntrega] = useState("")

    const handleChange = (e) => {
        setNovaEntrega(e.target.value)
    }

    const handleAddEntrega = async (e) => {
        e.preventDefault()

        if (!endereco || endereco.trim() === "") {
            alert("Endereço inválida ou não informada.")
            return
        }

        try {
            // Verifica se o MetaMask está disponível
            if (!window.ethereum) {
                alert("MetaMask não está disponível")
                return
            }

            // Verifica se está na rede Passeo
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
                                params: [{
                                    chainId: chainIdPasseo,
                                    chainName: "Passeo Testnet",
                                    rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
                                    nativeCurrency: {
                                        name: "ETH",
                                        symbol: "ETH",
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ["https://explorer.passeo.io"],
                                }],
                            })
                        } catch (addError) {
                            alert("Erro ao adicionar a rede Passeo ao MetaMask.")
                            return
                        }
                    } else {
                        alert("Troca de rede recusada. Conecte à rede Passeo para continuar.")
                        return
                    }
                }
            }

            // Solicita conexão com a carteira
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Cria provider e signer
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()

            // Instancia o contrato
            const contrato = new ethers.Contract(contratoEndereco, contratoABI, signer)

            // Chama a função do contrato com a placa
            const tx = await contrato.cadastrarCarga(endereco)
            await tx.wait()

        } catch (error) {
            console.error("Erro ao cadastrar carga:", error)

            // Tenta extrair a razão do revert
            if (error.reason) {
                alert(`Erro ao cadastrar carga: ${error.reason}`)
            } else if (error.message) {
                alert(`Erro ao cadastrar carga: ${error.message}`)
            } else {
                alert("Erro ao cadastrar carga. Veja o console para mais detalhes.")
            }
        }
    }

    return (
        <>
            <h5 className="text-center">Cadastrar nova entrega</h5>
            <form className="mt-3">
                {/* <Select label="Placa do caminhão" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} conteudo={listaPlacas} /> */}
                <Input label="Chave Publica" type="text" id="chaveCaminhao" onChange={handleChange} obrigatorio={true} />
                {/* <Input label="Placa do caminhão" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} /> */}
                {/* <Input label="Tipo" type="text" id="tipoEntrega" onChange={handleChange} obrigatorio={true} /> */}
                {/* <Input label="Status" type="text" id="statusEntrega" obrigatorio={true} value={"Em andamento"} disabled={true} /> */}
                <Botao classBootstrap="btn-success" largura={"100%"} onClick={handleAddEntrega}>
                    Cadastrar nova entrega
                </Botao>
            </form>
        </>
    )
}

export default FormAddEntrega
