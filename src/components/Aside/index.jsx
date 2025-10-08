import styled from "styled-components"
import Input from "../Input"
import Botao from "../Botao"
import { useRecoilState } from "recoil"
import { entregaSelecionadaState } from "../../recoil/entregasAtom"
import FormTemperatura from "../FormTemperatura"
import DetalhesEntrega from "../DetalhesEntrega"
import FormAddCaminhao from "../FormAddCaminhao"
import FormAddEntrega from "../FormAddEntrega"

const AsideStyled = styled.aside`
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px #f0f1f2;
    border-radius: 5px;
    padding: 40px;
    min-width: 300px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
`

const Aside = () => {
    const [entregaSelecionada, setEntregaSelecionada] = useRecoilState(entregaSelecionadaState)

    const handleFecharAside = (e) => {
        e.preventDefault()
        setEntregaSelecionada({
            idEntrega: "",
            detalhesEntrega: "",
            acao: "",
        })
    }
    return entregaSelecionada.idEntrega !== "" ? (
        <AsideStyled>
            {entregaSelecionada.acao === "registrarTemperatura" ? <FormTemperatura carga={entregaSelecionada} /> : entregaSelecionada.acao === "exibirEntrega" ? <DetalhesEntrega carga={entregaSelecionada} /> : entregaSelecionada.acao === "addCaminhao" ? <FormAddCaminhao carga={entregaSelecionada} /> : entregaSelecionada.acao === "addEntrega" ? <FormAddEntrega carga={entregaSelecionada} /> : ""}

            <div className="mt-3 d-md-flex justify-content-md-center ">
                <Botao classBootstrap={"btn-outline-danger"} onClick={handleFecharAside} largura={"100%"}>
                    Fechar
                </Botao>
            </div>
        </AsideStyled>
    ) : (
        ""
    )
}

export default Aside
