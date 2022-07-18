import { Heading, Link, Container, Box, HStack, VStack, Grid, GridItem, SimpleGrid } from "@chakra-ui/layout";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    SliderMark,
} from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import VisualizeSorting from "../../components/VisualizeSorting";
import { selectionSort, stepBubbleSort } from "../../../utils/sort";
import { Button, ButtonGroup } from "@chakra-ui/button";
import SortDisplay from "../../components/SortDisplay";
import Footer from "../../components/Footer";

const Visualizations = () => {
    // let arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 500));

    const [nums, setNums] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));
    const [arrSteps, setArrSteps] = useState([]); // a stack of number[] 
    const [paused, setPaused] = useState(true);
    const [i, setI] = useState(-1);
    const [j, setJ] = useState(-1);
    const timerRef = useRef(null);

    const toggleSort = () => {
        setI(0);
        setJ(0);
        setPaused(!paused);
    }

    /**
     * Sets nums, i, j to the last iteration
     */
    const backStep = () => {
        let previous = arrSteps.pop();
        if (previous === undefined) return;
        setNums(previous);
        if (j > 0) {
            setJ(j - 1);
        } else if (j === 0) {
            setI(i - 1);
            setJ(nums.length - i - 1);
        }
    }

    /**
     * Takes one step in the sorting algorithm
     */
    const takeStep = () => {
        let currSteps = [...arrSteps];
        stepBubbleSort({ nums, setNums, i, j, setI, setJ });
        if (nums !== currSteps[currSteps.length - 1]) {
            currSteps.push(nums);
            setArrSteps(currSteps);
        }
    }

    /**
     * Generates an array with the given parameters, setting state values to it
     * @param length the length of the array
     * @param range the maximum value of a number in the  array
     * @returns the generated array
     */
    const generateArr = (length: number, range: number): number[] => {
        let arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr = [...arr, Math.floor(Math.random() * 110)];
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
                let currSteps = [...arrSteps];
                stepBubbleSort({ nums, setNums, i, j, setI, setJ });
                if (nums !== currSteps[currSteps.length - 1]) {
                    currSteps.push(nums);
                    setArrSteps(currSteps);
                }
            }, 1);
        }
    }, [i, j, paused]);

    // have drop down menu to select sorting algorithm

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12}>
                <Heading>Visualizations</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <GridItem>
                        <VStack>
                            <Text>This is a visualization for Bubble Sort.</Text>
                            <Text>
                                Use the slider below to adjust the size of the array. Once you're done selecting the size,
                                click the "Play" button, to visualize the sorting. Pause the sorting at any time, and use
                                the arrows below to go backwards and forwards in 'steps' in the visualization.

                            </Text>
                            <Heading as='h5' size='sm'>Array Size:</Heading>
                            <Slider defaultValue={50} min={10} max={110} onChange={(val) => generateArr(val, val)}>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <ButtonGroup>
                                <Button onClick={() => backStep()} isDisabled={!paused}>Back</Button>
                                <Button onClick={() => toggleSort()}>{paused ? "Start" : "Pause"}</Button>
                                <Button onClick={() => takeStep()} isDisabled={!paused}>Forward</Button>
                            </ButtonGroup>
                        </VStack>
                    </GridItem>
                    <GridItem>
                        <SortDisplay nums={nums} />
                    </GridItem>
                </SimpleGrid>
            </Container>
            <Footer />
        </>
    )
}

export default Visualizations;