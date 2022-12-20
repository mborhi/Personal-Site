import { useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/checkbox";
import { Heading, Text, Stack, Box, SimpleGrid, Container, Flex, Spacer, Link } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import TableDisplay from "../../components/TableDisplay";
import Header from "../../components/Header";
import SpanText from "../../components/SpanText";
import { AcademicData, AcademicRecord, FilterOption } from "../../../interfaces";
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

    const [selectors, setSelectors] = useState<FilterOption[]>([]);

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
            currentSelectors = [...currentSelectors, { name: "majorOnly", value: onlyMajor }];
            setSelectors(currentSelectors);
        } else {
            // remove this filter option
            const currentSelectors = selectors.filter((selector) => selector.name !== "majorOnly");
            setSelectors(currentSelectors);

        }
    }

    const setHighGradeOnly = (checked: boolean) => {
        if (checked) {
            let currentSelectors = selectors;
            currentSelectors = [...currentSelectors, { name: "highGradesOnly", value: onlyHighGrade }];
            setSelectors(currentSelectors);
        } else {
            // remove this filter option
            const currentSelectors = selectors.filter((selector) => selector.name !== "highGradesOnly");
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
            <Header title='Academics' />
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12} textStyle="containerContent">
                <Box>
                    <Heading as='h1'>Computer Science Bachelor's Degree</Heading>
                    <Flex paddingTop={5} paddingBottom={2}>
                        <Box>
                            <Text fontSize='xl'>
                                My progress towards a Computer Science Bachelor's Degree at { }
                                <SpanText text={"Indiana University Bloomington."} link={"https://luddy.indiana.edu/"} decoration={"underline"} />
                                { }  { }
                            </Text>
                            <Text fontSize='xl'>
                                <SpanText text={"Hutton Honors"} link={"https://hutton.indiana.edu/index.html"} decoration={"underline"} />
                                { } Student and { }
                                <SpanText text={"Founders Scholar."} link={"https://universityevents.iu.edu/events/special-event/convocation/index.html"} decoration={"underline"} />
                                { } Dean's List all semesters.
                                On track to graduate in { }
                                <SpanText text={"May, 2025"} style={'italic'} />
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <Text fontSize='xl'>
                                Major GPA: 4.0
                                Overall GPA: 3.91
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
                <Box >
                    <Heading >Classes</Heading>
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