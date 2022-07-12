import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";

const VisualizeSorting = () => {
    // const nums = [10, 40, 50, 60, 180, 70];

    const [nums, setNums] = useState([100, 500, 300, 50, 600, 700, 200]);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    const [sorted, setSorted] = useState(false);
    const [timer, setTimer] = useState(null);

    const numsRef = useRef(nums);
    const iRef = useRef(i);
    const jRef = useRef(j);
    const timerRef = useRef(null);


    /*
    handleClick = () => {
        // Initialize the bubble sort state and start our timer
        this.setState({
            ...bubbleSortInit(this.props.array),
            timer: setInterval(() => this.handleTimer(), 250)
        });
    }
    handleTimer = () => {
        this.setState(oldState => {
            // Perform one iteration of the sort and stop the
            // timer if we finished the algorithm.
            const newState = bubbleSortStep(oldState) as State;
            if (newState.done) {
                clearInterval(oldState.timer!);
            }
            return newState;
        });
    }
    componentWillUnmount() {
        // Stop the timer if we get unmounted.
        // Note: harmless if timer isn't running / never ran
        clearInterval(this.state.timer!);
    }
    */

    const handleClick = () => {
        // setTimer(setInterval(() => handleTimer(), 250));
        console.log('clicked');
        if (timer === null) {
            setInterval(() => {
                console.log('doing...')
                const vals = handleTimer();
                console.log(vals);
                numsRef.current = vals.nums;
                iRef.current = vals.i;
                jRef.current = vals.j;
            }, 250);
        }
    }


    const handleTimer = () => {
        const newVals = stepBubbleSort(numsRef.current, iRef.current, jRef.current);
        if (sorted) {
            clearInterval(timer!);
        }
        return newVals;
    }

    const stepBubbleSort = (numbers, idx, jdx) => {
        if (idx === numbers.length) {
            setSorted(true);
        }

        if (numbers[jdx] > numbers[jdx + 1]) {
            let temp = numbers[jdx];
            numbers[jdx] = numbers[jdx + 1];
            numbers[jdx + 1] = temp;
        }

        if (++jdx === numbers.lengthh - idx - 1) {
            idx += 1;
            jdx = 0;
        }
        // setNums(numbers);
        // setI(idx);
        // setJ(jdx);
        return { nums: numbers, i: idx, j: jdx };
    }

    // const bubbleSort = (nums: number[]) => {
    //     let n = nums.length;
    //     for (let i = 0; i < n; i++) {
    //         for (let j = 0; j < n - i - 1; j++) {
    //             if (nums[j] > nums[j + 1]) {
    //                 let temp = nums[j];
    //                 nums[j] = nums[j + 1];
    //                 nums[j + 1] = temp;
    //                 timerRef.current = setTimeout(() => console.log('Hey ??'), 1000);
    //                 console.log('setting nums to: ', nums);
    //             }
    //         }
    //     }
    // }
    // bubbleSort(nums);
    useEffect(() => {
        // setInterval(() => handleTimer(), 250)
    }, []);

    return (
        <>
            <Button onClick={() => handleClick()}>sort</Button>
            <HStack align='left' spacing={2}>
                {nums.map((num) => (
                    <Box h={num} w={1} bg='facebook.300' key={num}></Box>
                ))}
            </HStack>
        </>
    )
}

export default VisualizeSorting;