import { Heading, Link, Container, Box, HStack, VStack, Grid, GridItem } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import VisualizeSorting from "../../components/VisualizeSorting";
import { selectionSort, stepBubbleSort } from "../../../utils/sort";
import { Button } from "@chakra-ui/button";
import SortDisplay from "../../components/SortDisplay";
import Footer from "../../components/Footer";

const Visualizations = () => {
    // let arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 500));

    const [nums, setNums] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));
    const [paused, setPaused] = useState(true);
    const [i, setI] = useState(-1);
    const [j, setJ] = useState(-1);
    const timerRef = useRef(null);

    const toggleSort = () => {
        setI(0);
        setJ(0);
        setPaused(!paused);
    }

    const generateArr = (length: number, range: number): number[] => {
        let arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr = [...arr, Math.floor(Math.random() * length)];
        }
        setI(0);
        setJ(0);
        setNums(arr);
        return arr;
    }

    useEffect(() => {
        if (!paused) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                stepBubbleSort({ nums, setNums, i, j, setI, setJ });
            }, 1);
        }
    }, [i, j, paused]);

    // have drop down menu to select sorting algorithm

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.100', 'gray.900')} maxW="100%" py={12}>
                <Heading>Visualizations</Heading>
                <Grid>
                    <VStack>
                        <Button onClick={() => toggleSort()}>{paused ? "Start" : "Pause"}</Button>
                        <Button onClick={() => generateArr(100, 200)}>Set Array</Button>
                    </VStack>
                    <Box>
                        <SortDisplay nums={nums} />
                    </Box>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default Visualizations;