import { Heading, Link, Container, Box, HStack, VStack, Grid, GridItem, SimpleGrid } from "@chakra-ui/layout";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    Flex,
    SliderMark,
} from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { StepAlgoParams, stepBubbleSort, stepInsertionSort } from "../../../utils/sort";
import { Button, ButtonGroup } from "@chakra-ui/button";
import SortDisplay from "../../components/SortDisplay";
import Footer from "../../components/Footer";
import MenuOptions from "../../components/MenuOptions";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getAllVisualizationContent, VisualizationContent } from "../../../utils/visualization";


export const getStaticProps = async () => {
    const allContent = await getAllVisualizationContent();

    return {
        props: {
            visContent: allContent
        }
    }
}


interface SortOption {
    value: (vals: StepAlgoParams) => void
    name: string,
}

interface SpeedOption {
    value: number
    name: string
}

interface Props {
    visContent: VisualizationContent[]
}

const Visualizations = ({ visContent }: Props) => {

    const [nums, setNums] = useState(Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)));
    const [arrSteps, setArrSteps] = useState([]); // a stack of number[] 
    const [paused, setPaused] = useState(true);
    const [done, setDone] = useState(false);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    // insertion sort key
    const [key, setKey] = useState(nums[1]);
    // sorting options
    const [sortOption, setSortOption] = useState<SortOption>({ value: stepBubbleSort, name: "Bubble Sort" });
    const [speed, setSpeed] = useState<SpeedOption>({ value: 1, name: "Very Fast" });
    // timer
    const timerRef = useRef(null);


    // List of available SortOptions
    const allSortOptions: SortOption[] = [
        { value: stepBubbleSort, name: "Bubble Sort" },
        { value: stepInsertionSort, name: "Insertion Sort" },
    ];

    // List of available SpeedOptions
    const allSpeedOptions: SpeedOption[] = [
        { value: 1, name: "Very Fast" },
        { value: 10, name: "Fast" },
        { value: 30, name: "Medium" },
        { value: 100, name: "Slow" },
        { value: 200, name: "Very Slow" },
    ];

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
        // generate new arr
        let arr: number[] = [];
        for (let i = 0; i < length; i++) {
            arr = [...arr, Math.floor(Math.random() * 110)];
        }
        // reset
        setI(0);
        setJ(0);
        setNums(arr);
        // for insertion sort
        setKey(arr[1]);
        setDone(false);
        // clear the old stack of arr steps
        setArrSteps([]);
        // pause so animation doesn't start abruptly
        setPaused(true);
        return arr;
    }

    /**
     * Changes the sortOption to the given values
     * @param {SortOption} param0 the new sortOption values
     */
    const changeSortOption = async ({ name, value }) => {
        // update the sortAlgoContent
        setSortOption({ value: value, name: name });
    }

    /**
     * Changes the speed state to the given values
     * @param {SpeedOption} param0 the new speed state values
     */
    const changeSpeedOption = ({ name, value }) => {
        setSpeed({ value: value, name: name });
    }

    /**
     * Returns the content of the currently selected sorting algorithm as a stirng
     * @returns {string} the content of the sorting algo explanation file
     */
    const getSortAlgoContent = (): string => {
        const currentAlgoId = sortOption.name.replace(/\s/g, '');
        let algoContent = "";
        visContent.forEach((content: VisualizationContent) => {
            if (content.algorithm_id === currentAlgoId) {
                algoContent = content.content;
            }
        });
        return algoContent;
    }

    useEffect(() => {
        if (!paused) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                let currSteps = [...arrSteps];
                if (sortOption.name === "Bubble Sort") {
                    stepBubbleSort({ nums, setNums, i, j, setI, setJ });
                } else {
                    stepInsertionSort({ nums, setNums, i, j, setI, setJ, key, setKey, setDone });
                }
                if (nums !== currSteps[currSteps.length - 1] || !done) {
                    currSteps.push(nums);
                    setArrSteps(currSteps);
                }
            }, speed.value);
        }
    }, [i, j, paused, done]);

    return (
        <>
            <Header title='Visualizations' />
            <NavBar />
            <Container bg={useColorModeValue('gray.50', 'gray.900')} maxW="100%" py={12} paddingTop={5}>
                <Box >
                    <Heading>Visualizations</Heading>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} paddingTop={10} paddingBottom={10}>
                    <GridItem>
                        <Text>
                            Use the slider to adjust the size of the array. After selecting the size,
                            click the "Start" button, to visualize the sorting. Pause the sorting at any time, and use
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
                            <Button onClick={() => generateArr(nums.length, nums.length)} variant='solid'>Reset Array</Button>
                            <Heading as='h5' size='sm'>Array Size:</Heading>
                            <Slider defaultValue={30} min={10} max={110} onChange={(val) => generateArr(val, val)}>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <ButtonGroup>
                                <Button onClick={() => backStep()} isDisabled={!paused}>Back</Button>
                                <Button onClick={() => toggleSort()} variant='solid'>{paused ? "Start" : "Pause"}</Button>
                                <Button onClick={() => takeStep()} isDisabled={!paused}>Forward</Button>
                            </ButtonGroup>
                        </VStack>
                    </GridItem>
                    <GridItem>
                        <SortDisplay nums={nums} />
                    </GridItem>
                </SimpleGrid>
                <Box textStyle='mainContent' paddingTop={5}>
                    <ReactMarkdown children={getSortAlgoContent()}></ReactMarkdown>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Visualizations;