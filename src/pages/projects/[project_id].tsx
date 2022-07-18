import React from "react";
import { getAllProjectIds, getProjectData } from "../../../utils/projects";
import { Box, Container, Center, Link, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { BiArrowBack } from 'react-icons/bi';
import { HStack } from "@chakra-ui/react";

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

    const pagePath = [
        {
            name: 'Projects',
            route: 'http://localhost:3000/projects'
        },
    ];

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12}>
                <HStack marginBottom={2}>
                    <Box>
                        <Link href='/projects'><BiArrowBack size='1em' /></Link>
                    </Box>
                    <Box>
                        <Link href='/projects'><Heading size='md'>Back to all projects</Heading></Link>
                    </Box>
                </HStack>
                <Box textStyle='mainContent'>
                    <ReactMarkdown children={projectData.content}></ReactMarkdown>
                    {(projectData.content)}
                </Box>
            </Container>
            <Footer />
        </>

    )

}

export default Project;