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


describe('Test Insertion Sort', () => {
    let i, j, key, nums;

    const setI = (val: number) => { i = val; }
    const setJ = (val: number) => { j = val; }
    const setKey = (val: number) => { key = val; }
    const setNums = (vals: number[]) => { nums = vals; }

    it('correctly sorts array with many duplicates', () => {
        nums = [19, 16, 5, 19, 5, 80, 78, 49, 87, 87, 19, 5];
        const sorted = nums.sort((a, b) => a - b);
        i = 0;
        j = 0;
        key = nums[i];
        // setup while loop to mock useEffect
        while (i < nums.length) {
            stepInsertionSort({ nums, setNums, i, j, setI, setJ, key, setKey });
        }
        expect(nums).toEqual(sorted);

    })

    it('correctly sorts large array of numbers', () => {
        nums = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
        const sorted = nums.sort((a, b) => a - b);
        i = 0;
        j = 0;
        key = nums[i];
        // setup while loop to mock useEffect
        while (i < nums.length) {
            stepInsertionSort({ nums, setNums, i, j, setI, setJ, key, setKey });
        }
        expect(nums).toEqual(sorted);
    });

    it('correctly sorts array of numbers', () => {
        nums = [9, 3, 7, 4, 6];
        i = 1;
        j = 0;
        key = nums[i];
        const expectedNums = [3, 4, 6, 7, 9];
        // setup while loop to mock useEffect
        while (i < nums.length) {
            stepInsertionSort({ nums, setNums, i, setI, j, setJ, key, setKey });
        }
        expect(nums).toEqual(expectedNums);
    });

    it('correctly makes the first step in sort', () => {
        nums = [9, 3, 7, 4, 6];
        i = 1;
        j = 0;
        let key = nums[i];
        const expected = {
            nums: [9, 9, 7, 4, 6],
            i: 1, // stepInsertion should increment by one
            j: -1 // should hold the last value 
        }
        stepInsertionSort({ nums, setNums, i, j, setI, setJ, key, setKey });
        expect({ nums: nums, i: i, j: j }).toEqual(expected);
    });

    it('correctly makes a step', () => {
        nums = [3, 9, 7, 4, 6];
        const expected = {
            nums: [3, 9, 9, 4, 6],
            i: 2,
            j: 0
        };
        i = 2;
        j = 1;
        key = nums[i];

        stepInsertionSort({ nums, setNums, i, setI, j, setJ, key, setKey });
        // run stepInsertionSort
        const result = {
            nums: nums,
            i: i,
            j: j
        }
        expect(result).toEqual(expected);
    });

    it('correctly sorts one number', () => {
        // original values: nums = [3, 9, 7, 4, 6], key = 7, i = 2, j = 1
        nums = [3, 9, 9, 4, 6];
        const expected = {
            nums: [3, 7, 9, 4, 6],
            i: 3,
            j: 2
        };
        i = 2;
        j = 1;
        key = 7;

        stepInsertionSort({ nums, setNums, i, setI, j, setJ, key, setKey });
        // run stepInsertionSort
        const result = {
            nums: nums,
            i: i,
            j: j
        }
    });

    it('correctly uses the setKey hook to maintain the key', () => {
        nums = [3, 9, 7, 4, 6];
        const expected = {
            nums: [3, 7, 9, 4, 6],
            i: 3,
            j: 2,
            key: 4
        };
        i = 2;
        j = 1;
        key = nums[i];

        stepInsertionSort({ nums, setNums, i, setI, j, setJ, key, setKey });
        stepInsertionSort({ nums, setNums, i, setI, j, setJ, key, setKey });
        // run stepInsertionSort
        const result = {
            nums: nums,
            i: i,
            j: j,
            key: key
        }
        expect(result).toEqual(expected);
    });
});