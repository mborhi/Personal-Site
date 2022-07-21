export interface StepAlgoParams {
    nums: number[]
    setNums: (nums: number[]) => void
    i: number
    j: number
    setI: (num: number) => void
    setJ: (num: number) => void
    key?: number
    setKey?: (num: number) => void
    setDone?: (b: boolean) => void
}

/**
 * Makes one step in the bubble sort algorithm based on the given params
 * Used to visualize bubble sort animation
 * @param {StepAlgoParams} param0
 */
export const stepBubbleSort = ({ nums, setNums, i, j, setI, setJ }: StepAlgoParams) => {
    let dataArray = [...nums];
    const size = nums.length;
    let swap = dataArray[j];

    if (j === size - i - 1) {
        setJ(0);
        setI(i + 1);
    }

    if (i < size - 1 && j < size - i - 1) {
        if (swap > dataArray[j + 1]) {
            dataArray[j] = dataArray[j + 1];
            dataArray[j + 1] = swap;
            setNums(dataArray);
            setJ(j + 1);
        } else {
            setJ(j + 1);
        }
    }
}

/**
 * Makes one step in the insertion sort algorithm based on the given params
 * Used to visualize insertion sort animation
 * @param {StepAlgoParams} param0
 */
export const stepInsertionSort = ({ nums, setNums, i, setI, j, setJ, key, setKey, setDone = (b: boolean) => null }: StepAlgoParams) => {
    let arr = [...nums];
    const size = nums.length;

    if (i !== size) { // not end of for loop
        if (key < arr[j] && j >= 0) { // inside while loop
            // shift elements
            arr[j + 1] = arr[j];
            // advance and update values
            setJ(j - 1);
            setNums(arr);
        } else { // end of while loop
            // insert the key
            arr[j + 1] = key;
            // advance update values
            setNums(arr);
            setI(i + 1);
            setJ(i); // curr i - 1
            setKey(nums[i + 1]);
        }
    } else {
        // end of for loop, done
        setDone(true);
    }
}

// repeatedly find the smallest element, move to beginning of non-sorted section of array
export const selectionSort = async ({ nums, setMin, getMin, setNums, i, j, setI, setJ }) => {
    let arr = [...nums];
    // let dataArray = [...nums];
    // let size = nums.length;
    // if (dataArray[j] < dataArray[min.get()]) {
    //     min.set(j);
    // }
    // if (j === size - 1) {
    //     let swap = dataArray[i];
    //     dataArray[i] = dataArray[min.get()];
    //     dataArray[min.get()] = swap;
    //     setNums(dataArray);
    //     min.set(i + 1);
    //     setJ(i + 1);
    //     setI(i + 1);
    // }
    // else if (i < size && j < size) {
    //     setJ(j + 1);
    // }

}

/**
 * Finds the index of the smallest number in the given array
 * @param nums the numbers to search
 * @returns the index of the smallest number
 */
const getMin = (nums: number[]): number => {
    let smallest = 0;
    nums.forEach((num, i) => {
        if (nums[smallest] >= num) {
            smallest = i;
        }
    });
    return smallest;
}

/**
 * Swaps the values at the two given indices in the specified array
 * @param arr the array to swap in
 * @param a the first index
 * @param b the second index
 */
const swap = (arr: number[], a: number, b: number) => {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}