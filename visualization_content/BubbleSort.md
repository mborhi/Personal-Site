Bubble Sort is a comparison based sorting algorithm. It works by comparing adjacent elements starting from the front of the array and switching elements appropriately. As it can be seen from the visualization, this creates a "bubbling" effect.

**Time Complexity**: O(N^2), where N is the size of the array.

**Space Complexity**: O(1)

**Implementation**

```
function bubbleSort( arr, n) 
{ 
var i, j; 
for (i = 0; i < n-1; i++) 
{ 
    for (j = 0; j < n-i-1; j++) 
    { 
        if (arr[j] > arr[j+1]) 
        { 
        swap(arr,j,j+1); 
          
        } 
    } 
  
} 
} 
```

