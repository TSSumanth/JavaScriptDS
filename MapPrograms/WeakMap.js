//The first difference from Map is that WeakMap keys must be objects, not primitive values:
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
// weakMap.set("test", "Whoops"); // Error, because "test" is not an object

//Now, if we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.
let john = { name: "John" };

weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference
// john is removed from memory!

console.log(weakMap)

/*
WeakMap has only the following methods:
•	weakMap.get(key)
•	weakMap.set(key, value)
•	weakMap.delete(key)
•	weakMap.has(key)
*/