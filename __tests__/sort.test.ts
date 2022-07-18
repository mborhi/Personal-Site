import { selectionSort, stepBubbleSort, stepInsertionSort } from "../utils/sort";

describe('Test Bubble Sort', () => {
    // setup state mocks and hook mocks
    let nums: number[], i: number, j: number;
    const setI = (val: number) => { i = val; }
    const setJ = (val: number) => { j = val; }
    const setNums = (vals: number[]) => { nums = vals; }

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it('correctly sorts array of numbers', () => {
        // init mock state vars
        nums = [10, 4, 50, 60, 2, 1, 5, 100];
        i = 0;
        j = 0;
        // setup while loop to mock useEffect
        while (i < nums.length) {
            stepBubbleSort({ nums, setNums, i, j, setI, setJ });
        }
        const sorted = [1, 2, 4, 5, 10, 50, 60, 100];
        expect(nums).toEqual(sorted);
    });

    it('correctly makes one step forward', () => {
        // init mock state vars
        nums = [10, 4, 50, 60, 2, 1, 5, 100];
        i = 0;
        j = 0;
        const expected = {
            nums: [4, 10, 50, 60, 2, 1, 5, 100],
            i: 0,
            j: 1
        };
        stepBubbleSort({ nums, setNums, i, j, setI, setJ });
        const result = {
            nums: nums,
            i: i,
            j: j
        };
        expect(result).toEqual(expected);
    });

    it('correctly makes one step back', () => {

    });
});

/*
describe('Test Insertion Sort', () => {
    it('correctly sorts array of numbers', () => {
        let nums = [10, 4, 50, 60, 2, 1, 5, 100];
        const sorted = [1, 2, 4, 5, 10, 50, 60, 100];
        // setup usetState hook simulators
        let i = 0;
        let j = 0;
        const setI = (val) => { i = val; }
        const setJ = (val) => { j = val; }
        const setNums = (vals) => { nums = vals; }
        // setup while loop to mock useEffect
        // selectionSort({})
    });

    it('correctly makes a step', () => {
        let nums = [3, 4, 10, 6, 12];
        const expected = {
            nums: [3, 4, 6, 10, 12],
            i: 3,
            j: 1
        };
        // setup useState hook simulators
        let i = 3;
        let j = 2;
        const setI = (val: number) => { i = val; }
        const setJ = (val: number) => { j = val; }
        const setNums = (vals: number[]) => { nums = vals; }
        stepInsertionSort({ nums, setNums, i, setI, j, setJ });
        // run stepInsertionSort
        const result = {
            nums: nums,
            i: i,
            j: j
        }
        expect(result).toEqual(expected);
    });
});
*/