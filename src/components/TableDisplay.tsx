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
    options: ((entry: AcademicData) => boolean)[]
}

const TableDisplay = ({ title, data, options }: Props) => {

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (options.length === 0) {
            setFilteredData(data);
        } else {
            let filtered = data;
            options.forEach((option) => {
                filtered = filtered.filter((entry) => option(entry));
            });
            setFilteredData(filtered);
        }
    }, [options]);

    return (
        filteredData.length > 0 ? (
            <>
                <Heading size='lg'>{title}</Heading>
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
        ) :
            <></>
    )
}

export default TableDisplay;