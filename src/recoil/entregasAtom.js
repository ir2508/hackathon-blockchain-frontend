import { atom, selector } from "recoil"
import { caminhaoSelecionadoState } from "./caminhoesAtom"

export const entregaSelecionadaState = atom({
    key: "entregaSelecionadaState",
    default: {
        idEntrega: "",
        detalhesEntrega: "",
        acao: ""
    },
})

export const entregasState = atom({
    key: "entregasState",
    default: [],
})



export const entregasFiltradasState = selector({
    key: "entregasFiltradasState",
    get: ({ get }) => {
        const entregas = get(entregasState)
        const caminhaoSelecionado = get(caminhaoSelecionadoState)

        if (!caminhaoSelecionado?.placaCaminhao) {
            return entregas // se nenhum caminhão estiver selecionado, mostra todas
        }

        return entregas.filter(
            (entrega) => entrega.caminhaoId === caminhaoSelecionado.placaCaminhao
        )
    },
})

