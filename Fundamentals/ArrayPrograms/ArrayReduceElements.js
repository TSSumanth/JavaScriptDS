let arr = [1,2,5,6,3,4,10,7]
//accumulator -> result of previous function call, this is equal to initial in first call. If initial is not provided
// item -> current element in the array
// initial -> is optional. here we have provided it as 10. if there’s no initial, then reduce takes the first element of the array as the initial value and starts the iteration from the 2nd element
let sum = arr.reduce(function(accumulator , item){
   return accumulator + item
},10)
console.log(sum); //48
sum = arr.reduce((accumulator, item) => accumulator + item,10)
console.log(sum); //48
 