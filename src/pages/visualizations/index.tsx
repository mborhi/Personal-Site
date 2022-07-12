import { Heading, Link, Container, Box, HStack, VStack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import VisualizeSorting from "../../components/VisualizeSorting";
import { stepBubbleSort } from "../../../utils/sort";
import { Button } from "@chakra-ui/button";

const Visualizations = () => {
    // let arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 500));

    const [nums, setNums] = useState(() => Array.from({ length: 40 }, () => Math.floor(Math.random() * 40)));
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    const timerRef = useRef(null);

    // have a stack of nums state, to allow for forward/back buttons
    // have state of nums to allow for pausing(?) 

    const drawNums = (nums: number[]) => {
        // some css to draw the numbers
    }

    const restartSort = () => {
        let arr = generateArr(50, 500);
        setNums(arr);
        setI(0);
        setJ(0);
    }

    const generateArr = (length: number, range: number): number[] => {
        let arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr = [...arr, Math.floor(Math.random() * length)];
        }
        return arr;
    }

    useEffect(() => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            stepBubbleSort({ nums, setNums, i, j, setI, setJ });
        }, 100);
    }, [i, j]);

    // have drop down menu to select sorting algorithm

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.100', 'gray.900')} maxW="100%" py={12}>
                <VStack>
                    <Button onClick={() => restartSort()}>Start</Button>
                    <Button onClick={() => setNums([100, 500, 300, 50, 400, 550, 200])}>Reset Array</Button>
                </VStack>
                <Heading>Visualizations</Heading>
                <Box>
                    <HStack align='left' spacing={2}>
                        {nums.map((num) => (
                            <Box h={num} w={1} bg='facebook.300' key={num}></Box>
                        ))}
                    </HStack>
                </Box>
            </Container>
        </>
    )
}

export default Visualizations;