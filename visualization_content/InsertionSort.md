Insertion sort is a comparison based algorithm. It works by repeatedly inserting an element into the sorted part of the array. The **Time Complexity** is O(N^2), where N is the size of the array. The **Space Complexity** is O(1). While the time complexity of the algorithm is bad, because it only uses constant space, Insertion Sort can be a good option to use in specific cases. For example, if the number of elements, N, is low and low amount of storage must be used. Given these paramaters, insertion sort may be more optimal than a recursive implementation of Merge Sort, since Merge Sort will use more space due to the recursion. It would be a bad idea to use insertion sort when the number of elements is large or unknown.

**Implementation**

```
function bubbleSort( arr, n) { 
let i, j; 
for (i = 0; i < n-1; i++) { 
    for (j = 0; j < n-i-1; j++) 
    { 
        if (arr[j] > arr[j+1]) 
        { 
        // swaps the two given elements in the given array
        swap(arr,j,j+1);
        } 
    } 
  } 
} 
```