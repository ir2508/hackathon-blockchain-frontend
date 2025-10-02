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
    /* box-sizing: border-box;
    max-width: 100vw;
    height: 100vh; */

    display: flex;
`

const LayoutDefault = () => {
    return (
        <ContainerStyled>
            <Header />

            <SectionPrincipalStyled>
                <main>
                    <Outlet />
                </main>
                <Aside />
            </SectionPrincipalStyled>
        </ContainerStyled>
    )
}

export default LayoutDefault
