import React from "react";
import { Container, Heading, Box, SimpleGrid } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { getAllProjectsData } from "../../../utils/projects";
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

export const getStaticProps = async () => {
    const projects = getAllProjectsData();
    return {
        props: {
            projects,
        },
    };
}

const Projects = ({ projects }) => {
    return (
        <>
            <Header title='Projects' />
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12}>
                <Heading>Projects</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    {projects.map((project, idx) => (
                        <Box key={idx}>
                            <Card
                                name={project.name}
                                description={project.desc}
                                image={project.image}
                                date={project.date}
                                tech={project.tech}
                                id={project.id}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
                <Footer />
            </Container>
        </>

    )
}
export default Projects