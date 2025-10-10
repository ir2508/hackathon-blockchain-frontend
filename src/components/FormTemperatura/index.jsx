import { useEffect, useState } from "react"
import Botao from "../Botao"
import Input from "../Input"
import { ethers } from "ethers"

const contratoABI = [
    "function adicionarAfericao(uint cargaId, int temperaturaDecimosCelsius) public",
]

const contratoEndereco = "0x7290668053c1f1467F93d63561571e1Be3cBeA9A"
const chainIdPasseo = "0x190F1B46" // 420420422 em hexadecimal

const FormTemperatura = ({ carga }) => {
    const [idEntrega, setIdEntrega] = useState(carga.idEntrega)

    const [afericao, setAfericao] = useState({
        idEntrega: idEntrega,
        temperatura: "",
        timestamp: "",
    })

    useEffect(() => {
        setIdEntrega(carga.idEntrega)
    }, [carga.idEntrega])

    const handleChange = (e) => {
        setAfericao({
            ...afericao,
            [e.target.id]: e.target.value * 10,
        })
    }

    const handleAferirTemperatura = async (e) => {
        e.preventDefault()
        setAfericao({
            ...afericao,
            idEntrega: idEntrega
        })

        if (!afericao.temperatura || afericao.temperatura === "") {
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
            const tx = await contrato.adicionarAfericao( afericao.idEntrega , afericao.temperatura)
            await tx.wait()

        } catch (error) {
            console.error("Erro ao aferir temperatura:", error)

            // Tenta extrair a razão do revert
            if (error.reason) {
                alert(`Erro ao aferir temperatura: ${error.reason}`)
            } else if (error.message) {
                alert(`Erro ao aferir temperatura: ${error.message}`)
            } else {
                alert("Erro ao aferir temperatura. Veja o console para mais detalhes.")
            }
        }
    }

    return (
        <>
            <h5 className="text-center">Registrar temperatura</h5>
            <form className="mt-3">
                <Input label="ID da carga" type="text" id="idEntrega" obrigatorio={true} value={carga.idEntrega} onChange={handleChange} disabled={true} />
                <Input label="Temperatura Celsius" type="number" id="temperatura" obrigatorio={true} onChange={handleChange} />
                <div className="text-center">
                    <Botao classBootstrap="btn-success" largura={"100%"} onClick={handleAferirTemperatura}>
                        Registrar temperatura
                    </Botao>
                </div>
            </form>
        </>
    )
}

export default FormTemperatura
