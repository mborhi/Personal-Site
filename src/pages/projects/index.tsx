import React from "react";
import { Container, Box, SimpleGrid } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { getAllProjectsData } from "../../../utils/projects";
import Nav from '../../components/Nav';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import NavBar from "../../components/NavBar";
import BreadcrumbNav from "../../components/BreadcrumbNav";

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
            <NavBar />
            <Container bg={useColorModeValue('gray.100', 'gray.900')} maxW="100%" py={12}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    {projects.map((project) => (
                        <Box key={project.id}>
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