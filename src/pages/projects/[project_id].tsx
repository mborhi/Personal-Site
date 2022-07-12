import React from "react";
import { getAllProjectIds, getProjectData } from "../../../utils/projects";
import Nav from '../../components/Nav';
import { Box, Container, Center } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

export const getStaticProps = async ({ params }) => {
    // call an external API endpoint to get posts
    const projectData = await getProjectData(params.project_id);
    return {
        props: {
            projectData,
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllProjectIds();
    return {
        paths,
        fallback: false
    }
}


const Project = ({ projectData }) => {

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.100', 'gray.900')} maxW="100%" py={12}>
                <Box textStyle='mainContent'>
                    <ReactMarkdown children={projectData.content}></ReactMarkdown>
                </Box>
            </Container>
            <Footer />
        </>

    )

}

export default Project;