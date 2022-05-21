let pairs = new Map();
// set() adds key value pair to the Map and returns the new Map object
pairs.set("A","Apple");
pairs.set("B","Ball");
pairs.set("C","Cat");
pairs.set("D","Dog");
pairs.set("E","Egg");
pairs.set("F","Fox");

console.log(pairs);
/*
Map(6) {
  'A' => 'Apple',
  'B' => 'Ball',
  'C' => 'Cat',
  'D' => 'Dog',
  'E' => 'Egg',
  'F' => 'Fox'
}
*/

let tostr = pairs.toString()
console.log(tostr); //[object Map]

// Add same pair again(Duplicate Key)
let duplicateKey = pairs.set("F","Frog"); // Updates value for key "F"
console.log(duplicateKey); 
console.log(pairs);
// here duplicate key and pairs contains same data 

//size --> gives total number of pairs pesent in Map
// size is not a method, it is a variable  
console.log(pairs.size);

//get(KeyName) --> gives value of the key
//if key is not present returns undefined
console.log(pairs.get("A"));

//has(key): check if a key is present
console.log(pairs.has("A")); //true

//•	map.delete(key) – removes the value by the key.
//•	map.clear() – removes everything from the map.


//Iterate over the Map 
//keys() -> returns all keys present in the Map
let allKeys =  pairs.keys(); // returns a iteratable object
console.log(allKeys)

for(let key of allKeys)
{
    console.log(pairs.get(key))
}

//values() -> returns all keys present in the Map
let allValues =  pairs.values(); // returns a iteratable object
console.log(allValues)

for(let value of allValues)
{
    console.log(value)
}

//we can iterate through entire entry
for(let entry of pairs)
{
    console.log(entry)
}

//Map has a built-in forEach method, similar to Array
pairs.forEach((value,key,map) => {
    console.log(`${key} : ${value}`)
});

//Objects can also be used as keys
let john = { name: "John" };
// for every user, let's store their visits count
let visitsCountMap = new Map();
// john is the key for the map
visitsCountMap.set(john, 123);
console.log( visitsCountMap.get(john) ); // 123

//Here, Object.entries returns the array of key/value pairs: 
//[ ["name","John"], ["age", 30] ]. That’s what Map needs.
let obj = {
    name: "John",
    age: 30
  };
  
let map = new Map(Object.entries(obj));
console.log( map.get('name') ); // John
  
// Object.fromEntries() method that does the reverse: given an array of [key, value] pairs,
// it creates an object from them:
let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
  ]);
  
  // now prices = { banana: 1, orange: 2, meat: 4 }
  
  alert(prices.orange); // 2
  
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }
