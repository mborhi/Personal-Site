import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { Heading, Text, Stack, Box, SimpleGrid, Container, Flex, Spacer } from "@chakra-ui/layout";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import TableDisplay from "../../components/TableDisplay";
import { AcademicData } from "../../../interfaces";

// TODO: use getStaticProps (with revalidation) to get list of academic data for every semester
// AcademicRecord: { title: string, data: AcademicData[] }
const Academics = () => {

    const [selector, setSelector] = useState(() => ((a: AcademicData) => true));


    const sampleAcademics: AcademicData[] = [
        {
            course: "Test-101",
            name: "Test Course Intro",
            grade: "A",
            isMajor: true
        },
        {
            course: "Test-102",
            name: "Advanced Test Course Intro",
            grade: "A+",
            isMajor: true
        },
        {
            course: "Test-212",
            name: "Ran Out of Names",
            grade: "B",
            isMajor: false
        },
        {
            course: "Test-312",
            name: "Can't think of any",
            grade: "B",
            isMajor: true
        }
    ];

    const chooseSelector = (value: string, checked: boolean) => {
        if (value === "majorOnly") {
            setMajorOnly(checked);
        } else if (value === "highGradesOnly") {
            setHighGradeOnly(checked);
        }
    }

    const setMajorOnly = (checked: boolean) => {
        if (checked) {
            setSelector(() => onlyMajor);
        } else {
            setSelector(() => ((a: AcademicData) => true));
        }
    }

    const setHighGradeOnly = (checked: boolean) => {
        if (checked) {
            setSelector(() => onlyHighGrade);
        } else {
            setSelector(() => ((a: AcademicData) => true));
        }
    }

    const onlyHighGrade = (a: AcademicData): boolean => {
        return a.grade === "A" || a.grade === "A+";
    }

    const onlyMajor = (a: AcademicData): boolean => {
        return a.isMajor;
    }

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.100', 'gray.900')} maxW="100%" py={12}>
                <Box>
                    <Heading as='h1'>Computer Science Bachelor's Degree</Heading>
                    <Flex>
                        <Box>
                            <Text fontSize='xl'>
                                My progress towards a Computer Science Bachelor's Degree at Indiana University Bloomington
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <Text fontSize='xl'>
                                Major GPA: 4.0
                                Cumulative GPA: 3.9
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox name="majorOnly" onChange={(e) => chooseSelector(e.target.name, e.target.checked)}>Show only major classes</Checkbox>
                    </Stack>
                </CheckboxGroup>
                <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox name="highGradesOnly" onChange={(e) => chooseSelector(e.target.name, e.target.checked)}>Show only high grades</Checkbox>
                    </Stack>
                </CheckboxGroup>
                <Heading>Classes</Heading>
                <Stack>
                    <TableDisplay title="Testing Comp" data={sampleAcademics} option={selector} />
                    <Heading>Fall 2021</Heading>
                    <TableContainer>
                        <Table variant='striped' colorScheme={useColorModeValue('gray.100', 'gray.900')}>
                            <Thead>
                                <Tr>
                                    <Th>Course</Th>
                                    <Th>Name</Th>
                                    <Th>Grade</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>CSCI-C 211</Td>
                                    <Td>Introduction to Computer Science</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>MATH-M 211</Td>
                                    <Td>Calculus I</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>INFO-I 101</Td>
                                    <Td>Introduction to Infromatics</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>FOLK-F 101</Td>
                                    <Td>Introduction to Folklore</Td>
                                    <Td>B+</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Heading>Spring 2022</Heading>
                    <TableContainer>
                        <Table variant='striped' colorScheme={useColorModeValue('gray.100', 'gray.900')}>
                            <Thead>
                                <Tr>
                                    <Th>Course</Th>
                                    <Th>Name</Th>
                                    <Th>Grade</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>CSCI-C 212</Td>
                                    <Td>Introduction to Software Systems</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>CSCI-C 241</Td>
                                    <Td>Discrete Structures for Comp. Sci.</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>CSCI-Y 399</Td>
                                    <Td>Undergraduate Independent Software Dev.</Td>
                                    <Td>A+</Td>
                                </Tr>
                                <Tr>
                                    <Td>MATH-M 212</Td>
                                    <Td>Calculus II</Td>
                                    <Td>A-</Td>
                                </Tr>
                                <Tr>
                                    <Td>PHIL-P 141</Td>
                                    <Td>Introduction to Ethics and Justice</Td>
                                    <Td>A</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Heading>Summer 2022</Heading>
                    <TableContainer>
                        <Table variant='striped' colorScheme={useColorModeValue('gray.100', 'gray.900')}>
                            <Thead>
                                <Tr>
                                    <Th>Course</Th>
                                    <Th>Name</Th>
                                    <Th>Grade</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>CSCI-C 343</Td>
                                    <Td>Data Structures</Td>
                                    <Td>A+</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
            <Footer />
        </>
    )
}

export default Academics;