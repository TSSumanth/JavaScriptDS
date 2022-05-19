let arr = [1,2,5,6,3,4,10,7]

arr.sort(function(a,b)
{
    return -compare(a,b)
})

arr.sort(compare)
function compare(a, b) {
    if (a > b) return 1; // if the first value is greater than the second
    if (a == b) return 0; // if values are equal
    if (a < b) return -1; // if the first value is less than the second
  }
  
console.log(arr)