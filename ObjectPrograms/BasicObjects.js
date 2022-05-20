//Create Object
let user = {
    name: "John",
    age: 30
}

//Read Property
console.log(user.name)
console.log(user.age)

//Add new Property
user.isAdmin = true;

console.log(user); //{ name: 'John', age: 30, isAdmin: true }

//Delete Property
delete user.age

//MultiWork Property
user = {
    name: "John",
    age: 30,
    "likes birds": true  // multiword property name must be quoted
  };
  
  user = {};
  // set
  user["likes birds"] = true;
  // get
  console.log(user["likes birds"]); // true
  
  // delete
  delete user["likes birds"];

//Computed Property
let fruit = "apple";

let bag = {
    [fruit]: 5
};
console.log(bag.apple); //5

//if we change the the value of fruit the property in bag 
//wont be changed;

fruit = "banana";
console.log(bag.apple); //5
console.log(fruit); //banana
console.log(bag.banana); //undefined

let bag2 = {};
bag2[fruit] = 10
console.log(bag2.banana); //10

fruit = "Grapes"
let bag3 = {
    ['NumberOf'+ fruit] : 15
}

console.log(bag3.NumberOfGrapes); //15 

//Check for Property
let user1 = { name: "John", age: 30 };
console.log( "age" in user1 ); // true, user.age exists
console.log( "blabla" in user1 ); // false, user.blabla doesnot exist

let key = "age";
console.log( key in user1 ); //true

//Iterate over Object
let user2 = {
    name: "John",
    age: 30,
    isAdmin: true
  };
  
  for (let key in user2) {
    // keys
    console.log( key );  // name, age, isAdmin
    // values for the keys
    console.log( user2[key] ); // John, 30, true
  }

  //cloning Object
  let user3 = {
    name: "John",
    age: 30
  };
  let clone = {}; // the new empty object
  // let's copy all user properties into it
  for (let key in user3) {
    clone[key] = user3[key];
  }
  