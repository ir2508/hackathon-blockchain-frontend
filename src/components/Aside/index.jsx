import styled from "styled-components"
import Input from "../Input"
import Botao from "../Botao"
import { useRecoilState } from "recoil"
import { entregaSelecionadaState } from "../../recoil/entregasAtom"
import FormTemperatura from "../FormTemperatura"
import DetalhesEntrega from "../DetalhesEntrega"

const AsideStyled = styled.aside`
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px #f0f1f2;
    border-radius: 5px;
    padding: 40px;
    min-width: 350px;
`

const Aside = () => {
    const [entregaSelecionada] = useRecoilState(entregaSelecionadaState)
    return entregaSelecionada.idEntrega !== "" 
    ? <AsideStyled>
        {entregaSelecionada.acao === "registrarTemperatura" 
        ? <FormTemperatura carga={entregaSelecionada} /> 
        
        : entregaSelecionada.acao === "exibirEntrega" 
        ? <DetalhesEntrega carga={entregaSelecionada} /> : ""}
        
        </AsideStyled> 
    
    : ""
}

export default Aside
