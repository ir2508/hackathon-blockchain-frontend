import { atom, selector } from "recoil"

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

export const placasCaminhoesState = selector({
    key: "placasCaminhoesState",
    get: ({ get }) => {
        const caminhoes = get(caminhoesState)

        return caminhoes.map((caminhao) => caminhao.placaCaminhao)

        // if (!caminhoes?.placaCaminhao) {
        //     return caminhoes
        // }

        // return entregas.filter(
        //     (entrega) => entrega.placaCaminhao === caminhaoSelecionado.placaCaminhao
        // )
    },
})