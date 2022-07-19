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
import { selectionSort, stepBubbleSort, stepInsertionSort } from "../../../utils/sort";
import { Button, ButtonGroup } from "@chakra-ui/button";
import SortDisplay from "../../components/SortDisplay";
import Footer from "../../components/Footer";
import MenuOptions from "../../components/MenuOptions";

interface StepAlgoParams {
    nums: number[]
    setNums: (nums: number[]) => void
    i: number
    j: number
    setI: (num: number) => void
    setJ: (num: number) => void
}

interface SortOption {
    value: (vals: StepAlgoParams) => void
    name: string
}

interface SpeedOption {
    value: number
    name: string
}

const Visualizations = () => {

    const [nums, setNums] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));
    const [arrSteps, setArrSteps] = useState([]); // a stack of number[] 
    const [paused, setPaused] = useState(true);
    const [i, setI] = useState(-1);
    const [j, setJ] = useState(-1);
    // sorting options
    const [sortOption, setSortOption] = useState<SortOption>({ value: stepBubbleSort, name: "Bubble Sort" });
    const [speed, setSpeed] = useState<SpeedOption>({ value: 1, name: "Very Fast" });
    // timer
    const timerRef = useRef(null);

    /**
     * Pauses the visualization
     */
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

    const allSortOptions: SortOption[] = [
        { value: stepBubbleSort, name: "Bubble Sort" },
        { value: stepInsertionSort, name: "Insertion Sort" },
    ];

    const allSpeedOptions: SpeedOption[] = [
        { value: 1, name: "Very Fast" },
        { value: 10, name: "Fast" },
        { value: 100, name: "Medium" },
        { value: 200, name: "Slow" },
        { value: 500, name: "Very Slow" },
    ];

    /**
     * Changes the sortOption to the given values
     * @param {SortOption} param0 the new sortOption values
     */
    const changeSortOption = ({ name, value }) => {
        setSortOption({ value: value, name: name });
    }

    /**
     * Changes the speed state to the given values
     * @param {SpeedOption} param0 the new speed state values
     */
    const changeSpeedOption = ({ name, value }) => {
        setSpeed({ value: value, name: name });
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
            }, speed.value);
        }
    }, [i, j, paused]);

    return (
        <>
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12}>
                <Box >
                    <Heading>Visualizations</Heading>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} paddingTop={10}>
                    <GridItem>
                        <Text>
                            Use the slider to adjust the size of the array. After selecting the size,
                            click the "Play" button, to visualize the sorting. Pause the sorting at any time, and use
                            the buttons to go backwards and forwards in 'steps' in the visualization.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Container centerContent>
                            <Text fontWeight='medium'>Select a sorting algorithm and speed</Text>
                            <SimpleGrid alignItems={'center'} columns={{ base: 1, md: 2 }} spacing={3}>
                                <GridItem>
                                    <MenuOptions selector={(s) => changeSortOption(s)} options={allSortOptions} selected={sortOption.name} comingSoon={true} />
                                </GridItem>
                                <GridItem>
                                    <MenuOptions selector={(s) => changeSpeedOption(s)} options={allSpeedOptions} selected={speed.name} comingSoon={false} />
                                </GridItem>
                            </SimpleGrid>
                        </Container>
                    </GridItem>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} paddingTop={10}>
                    <GridItem>
                        <VStack>
                            <Text fontWeight='bold'>This is a visualization for {sortOption.name}</Text>
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
                        <SortDisplay nums={nums} i={i} j={j} />
                    </GridItem>
                </SimpleGrid>
            </Container>
            <Footer />
        </>
    )
}

export default Visualizations;