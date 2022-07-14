import { stepBubbleSort } from "../utils/sort";

describe('Test Bubble Sort', () => {
    it('correctly sorts array of numbers', () => {
        let nums = [10, 4, 50, 60, 2, 1, 5, 100];
        const sorted = [1, 2, 4, 5, 10, 50, 60, 100];
        // setup useState hook simulators
        let i = 0;
        let j = 0;
        const setI = (val) => { i = val; }
        const setJ = (val) => { j = val; }
        const setNums = (vals) => { nums = vals; }
        // setup while loop to mock useEffect
        while (i < nums.length) {
            stepBubbleSort({ nums, setNums, i, j, setI, setJ });
        }
        // test for equality
        expect(nums).toEqual(sorted);
    });
});