### Algorithm Details
Bubble Sort is a comparison based sorting algorithm. It works by comparing adjacent elements starting from the front of the array and switching elements appropriately. As it can be seen from the visualization, this creates a "bubbling" effect.
The **Time Complexity** is O(N^2), where N is the size of the array. The **Space Complexity** is O(1). Bubble sort is an effective algorithm when N is known to be small, and no extra space is used. 

### Implementation

Below is the JavaScript implementation for Bubble Sort:

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

