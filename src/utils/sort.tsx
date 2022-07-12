import { Dispatch, SetStateAction } from "react";

export const stepBubbleSort = ({ nums, setNums, i, j, setI, setJ }) => {
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