import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { Heading, Text, Stack, Box, SimpleGrid, Container, Flex, Spacer, Link } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import TableDisplay from "../../components/TableDisplay";
import { AcademicData, AcademicRecord } from "../../../interfaces";
import { academicRecord } from "../../../academics";

// using get static props because this data could be obtained by parsing in the future
export const getStaticProps = async () => {
    const data = academicRecord;

    return {
        props: {
            academicRecord: data
        }
    }
}

interface Props {
    academicRecord: AcademicRecord[]
}

const Academics = ({ academicRecord }: Props) => {

    const [selectors, setSelectors] = useState([]);

    const chooseSelector = (value: string, checked: boolean) => {
        if (value === "majorOnly") {
            setMajorOnly(checked);
        } else if (value === "highGradesOnly") {
            setHighGradeOnly(checked);
        }
    }

    const setMajorOnly = (checked: boolean) => {
        if (checked) {
            let currentSelectors = selectors;
            currentSelectors = [...currentSelectors, onlyMajor];
            setSelectors(currentSelectors);
        } else {
            // remove this filter option
            const currentSelectors = selectors.filter((selector) => selector.name !== "onlyMajor");
            setSelectors(currentSelectors);

        }
    }

    const setHighGradeOnly = (checked: boolean) => {
        if (checked) {
            let currentSelectors = selectors;
            currentSelectors = [...currentSelectors, onlyHighGrade];
            setSelectors(currentSelectors);
        } else {
            // remove this filter option
            const currentSelectors = selectors.filter((selector) => selector.name !== "onlyHighGrade");
            setSelectors(currentSelectors);
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
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12}>
                <Box>
                    <Heading as='h1'>Computer Science Bachelor's Degree</Heading>
                    <Flex paddingTop={5} paddingBottom={2}>
                        <Box>
                            <Text fontSize='xl'>
                                My progress towards a Computer Science Bachelor's Degree at { }
                                <Text as={'span'} textDecoration='underline'>
                                    <Link href="https://luddy.indiana.edu/">Indiana University Bloomington.</Link>
                                </Text>
                                { }  { }
                            </Text>
                            <Text fontSize='xl'>On track to graduate in { }
                                <Text as={'span'} textDecoration='underline'>May, 2025.</Text>
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
                        <Checkbox name="highGradesOnly" onChange={(e) => chooseSelector(e.target.name, e.target.checked)}>Show only high grades</Checkbox>
                    </Stack>
                </CheckboxGroup>
                {/*
                <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    </Stack>
                </CheckboxGroup>
                */}
                <Box padding={2}>
                    <Heading paddingTop={2}>Classes</Heading>
                    <Stack paddingTop={5}>
                        {academicRecord.map((record) => (
                            <TableDisplay title={record.title} data={record.data} options={selectors} key={record.title} />
                        ))}
                    </Stack>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Academics;