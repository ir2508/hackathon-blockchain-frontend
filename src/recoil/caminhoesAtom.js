import { atom } from "recoil"

export const caminhaoSelecionadoState = atom({
    key: "caminhaoSelecionadoState",
    default: {
        placaCaminhao: "",
        detalhesCaminhao: ""
    },
})

export const caminhoesState = atom({
    key: "caminhoesState",
    default: [],
})
