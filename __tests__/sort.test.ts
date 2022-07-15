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
        console.log('arr: ', nums, ' i: ', i, ' j: ', j);
        const result = {
            nums: nums,
            i: i,
            j: j
        };
        expect(result).toEqual(expected);
    });
});