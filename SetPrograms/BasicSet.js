/*
A Set is a special type collection – “set of values” (without keys), 
where each value may occur only once.
*/
let setOfValues = new Set();

//set.add(value) – adds a value, returns the set itself.
let newset = setOfValues.add(1);
newset = setOfValues.add(2);
newset = setOfValues.add(3);
newset = setOfValues.add(4);

//when duplicate is added no error is thrown
newset = setOfValues.add(1);
console.log(newset);

//set.delete(value) – removes the value, 
//returns true if value existed at the moment of the call, otherwise false.
let check = setOfValues.delete(1);
console.log(check); //true

//•	set.clear() – removes everything from the set.
setOfValues.clear();

//•	set.has(value) – returns true if the value exists in the set, otherwise false.
check = setOfValues.has(3);
console.log(check);// false

//•	set.size – is the elements count. => size is a variable not method
let setsize = setOfValues.size
console.log(setsize); //0