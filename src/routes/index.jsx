import { createBrowserRouter } from "react-router-dom"
import LayoutDefault from "../layouts/LayoutDefault"
import Monitoramento from "../pages/Monitoramento"
import CadastrarCaminhao from "../pages/CadastrarCaminhao"
import CadastrarEntrega from "../pages/CadastrarEntrega"
import AferirTemperatura from "../pages/AferirTemperatura"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            { path: "/", element: <Monitoramento /> },
            { path: "/cadastro-caminhao", element: <CadastrarCaminhao /> },
            { path: "/cadastro-entrega", element: <CadastrarEntrega /> },
            { path: "/aferir-temperatura", element: <AferirTemperatura /> }
        ],
    },
])
