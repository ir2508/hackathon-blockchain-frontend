import { useEffect, useState } from "react"
import Botao from "../Botao"
import Input from "../Input"
import { ethers } from "ethers"
import { useRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { walletAddressState } from "../../recoil/walletAtom"
import ModalMetamask from "../../components/ModalMetamask"
import handleMetamaskError from "../../utils/handleMetamaskError"

const contratoABI = ["function adicionarAfericao(uint cargaId, int temperaturaDecimosCelsius) public"]

const contratoEndereco = "0x7290668053c1f1467F93d63561571e1Be3cBeA9A"

const FormTemperatura = ({ carga }) => {

    const [metamaskInfo, setMetamaskInfo] = useState({
        mensagemRetorno: "",
    })

    const walletAddress = useRecoilValue(walletAddressState)

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

        setAfericao({
            ...afericao,
            idEntrega: idEntrega,
        })

        if (!afericao.temperatura || afericao.temperatura === "") {
            setMetamaskInfo({
                mensagemRetorno: "Informe uma aferição válida",
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
                const tx = await contrato.adicionarAfericao(afericao.idEntrega, afericao.temperatura)
                await tx.wait()
                setMetamaskInfo({
                    mensagemRetorno: "Aferição registrada com sucesso!",
                })
            } catch (txError) {
                handleMetamaskError(txError, "Erro ao cadastrar aferição", setMetamaskInfo)
            }
        } catch (error) {
            handleMetamaskError(error, "Erro inesperado", setMetamaskInfo)
        }
    }

    return (
        <>
            <h5 className="text-center">Registrar temperatura</h5>
            <div class="alert alert-warning" role="alert">
                Esse formulário é temporário usado apenas para simular a ação do sensor IoT
            </div>
            <form className="mt-3">
                <Input label="ID da carga" type="text" id="idEntrega" obrigatorio={true} value={carga.idEntrega} onChange={handleChange} disabled={true} />
                <Input label="Temperatura Celsius" type="number" id="temperatura" obrigatorio={true} onChange={handleChange} />
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-success mt-5"
                        onClick={handleAferirTemperatura}
                        data-bs-toggle="modal"
                        data-bs-target="#loginMetamask"
                        style={{ width: "100%" }}
                    >
                        Registrar temperatura
                    </button>
                </div>
            </form>
            <ModalMetamask mensagem={metamaskInfo.mensagemRetorno} />
        </>
    )
}

export default FormTemperatura
