import { Outlet } from "react-router-dom"
import Aside from "../components/Aside"
import Header from "../components/Header"
import styled from "styled-components"

const ContainerStyled = styled.div`
    box-sizing: border-box;
    max-width: 100vw;
    height: 100vh;
`

const SectionPrincipalStyled = styled.section`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
`

const LayoutComprovante = () => {
    return (
        <ContainerStyled>
            <Header layout="publico" />

            <SectionPrincipalStyled>
                <main>
                    <Outlet />
                </main>
            </SectionPrincipalStyled>
        </ContainerStyled>
    )
}

export default LayoutComprovante
