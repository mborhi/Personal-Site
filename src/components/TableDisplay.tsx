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
import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AcademicData } from '../../interfaces';

interface Props {
    title: string
    data: AcademicData[]
    option: (entry: AcademicData) => boolean
}

// TODO: make the option be a list of functions, iterate through each function to get filteredData
const TableDisplay = ({ title, data, option }: Props) => {

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filtered = data.filter((entry) => option(entry));
        setFilteredData(filtered);
    }, [option]);

    return (
        <>
            <Heading>{title}</Heading>
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
                        {filteredData.map((entry) => (
                            <Tr key={entry.course}>
                                <Td>{entry.course}</Td>
                                <Td>{entry.name}</Td>
                                <Td>{entry.grade}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableDisplay;