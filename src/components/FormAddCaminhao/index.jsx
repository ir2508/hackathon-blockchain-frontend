import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from "recoil"
import Botao from "../Botao"
import Input from "../Input"
import { useState } from "react"
import { caminhoesState } from "../../recoil/caminhoesAtom"
import { ethers } from "ethers"

const contratoABI = [
    "function cadastrarMeuCaminhao(string placa) public",
]

const contratoEndereco = "0xeAB24340984F926d0B1a6C97309AD2d8B3a26cEe"
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const FormAddCaminhao = () => {
    // const [listaCaminhoes, setListaCaminhoes] = useRecoilState(caminhoesState)

    // const [novoCaminhao, setNovoCaminhao] = useState({
    //     id: uuidv4(),
    //     chavePublicaCaminhao: "",
    //     placaCaminhao: "",
    // })

    const [placa, setPlaca] = useState("")

    const handleChange = (e) => {
        setPlaca(e.target.value)
    }

    const handleAddCaminhao = async (e) =>{
        e.preventDefault()

        // setNovoCaminhao({
        //     ...novoCaminhao,
        //     id: uuidv4(),
        // })
        // setListaCaminhoes((currentCaminhoes) => [...currentCaminhoes, novoCaminhao])

        if (!placa || placa.trim() === "") {
            alert("Placa inválida ou não informada.")
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
                                    chainName: "Paseo PassetHub",
                                    rpcUrls: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
                                    nativeCurrency: {
                                        name: "PAS",
                                        symbol: "PAS",
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
            const tx = await contrato.cadastrarMeuCaminhao(placa)
            await tx.wait()

        } catch (error) {
            console.error("Erro ao cadastrar caminhão:", error)

            // Tenta extrair a razão do revert
            if (error.reason) {
                alert(`Erro ao cadastrar caminhão: ${error.reason}`)
            } else if (error.message) {
                alert(`Erro ao cadastrar caminhão: ${error.message}`)
            } else {
                alert("Erro ao cadastrar caminhão. Veja o console para mais detalhes.")
            }
        }


    }

    return (
        <form>
            {/* <Input label="Chave pública do caminhão" type="text" id="chavePublicaCaminhao" onChange={handleChange} obrigatorio={true} /> */}
            <Input label="Placa" type="text" id="placaCaminhao" onChange={handleChange} obrigatorio={true} />
            <Botao classBootstrap="btn-success" onClick={handleAddCaminhao}>Cadastrar novo caminhão</Botao>
        </form>
    )
}

export default FormAddCaminhao
