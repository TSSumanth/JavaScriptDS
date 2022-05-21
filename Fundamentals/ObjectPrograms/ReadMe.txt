Create Objects:
--------------
let user = new Object(); //object constructor syntax
let user = {}; //object literal syntax

let user = {
    name:"John",
    age: 30
}

Get Property Value:
-------------------
console.log(user.name)
console.log(user.age)

Add Property:
-------------
user.isAdmin = true

Delete Property:
----------------
delete user.age

MultiWork Property:
-------------------
user = {
    name: "John",
    age: 30,
    "likes birds": true  // multiword property name must be quoted
};

For multiword properties, the dot access doesn’t work:
// this would give a syntax error
user.likes birds = true

let user = {};
// set
user["likes birds"] = true;
// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

Computed Property:
-----------------
let fruit = "apple";

let bag = {
    [fruit]: 5
};
console.log(bag.apple); //5

if we change the the value of fruit the property in bag 
wont be changed;

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

Property Names:
--------------
Property names (keys) must be either strings or symbols.
Other types are automatically converted to strings.

let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
console.log( obj["0"] ); // test
console.log( obj[0] ); // test (same property)

Check for a Property:
---------------------
Case 1:
------
let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
Case 2:
------
let user = { age: 30 };
let key = "age";
alert( key in user ); //true
Case 3:
------
let obj = {
  test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!

Iterate over all Keys: for..in loop:
------------------------------------
for (key in object) {
// executes the body for each key among object properties
}
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}

Object Comparision:
-------------------
Two objects are equal only if they are the same object.
For instance, if two variables reference the same object, they are equal:
Case 1:
------
let a = {};
let b = a; // copy the reference
alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
Case 2:
------
let a = {};
let b = {}; // two independent objects
alert( a == b ); // false

Const Object:
-------------
object declared as const can be changed.

const user = {
  name: "John"
};
user.age = 25; // (*)
alert(user.age); // 25

The const would give an error if we try to set user to something
const user = {
  name: "John"
};
// Error (can't reassign user)
user = {
  name: "Pete"
};

Cloning or copying Objects:
--------------------------
Case 1:
------
let user = {
  name: "John",
  age: 30
};
let clone = {}; // the new empty object
// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

Object.assign:
-------------
Using object.assign will also work.
Syntax: Object.assign(dest, [src1, src2, src3...])
Case 2:
------
let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }

Case 3:
------
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182

it’s not enough to copy clone.sizes = user.sizes, because the user.sizes is an object, it will be copied by reference. So clone and user will share the same sizes:

To fix that, we should use the cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well. That is called a “deep cloning”.

Object Methods:
---------------
let user = {
  name: "John",
  age: 30
};
user.sayHi = function() {
  alert("Hello!");
};
user.sayHi(); // Hello!


Another shorter syntax:
// these objects do the same
user = {
  sayHi: function() {
    alert("Hello");
  }
};
// method shorthand looks better, right?
user = {
  sayHi() { // same as "sayHi: function()"
    alert("Hello");
  }
};

this in Methods:
----------------
let user = {
  name: "John",
  age: 30,
  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  }
};
user.sayHi(); // John

during the execution of user.sayHi(), the value of this will be user.
it’s also possible to access the object without this, by referencing it via the outer variable:

let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert(user.name); // "user" instead of "this"
  }
};

But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.
That’s demonstrated below:
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert( user.name ); // leads to an error
  }
};
let admin = user;
user = null; // overwrite to make things obvious
admin.sayHi(); // Whoops! inside sayHi(), the old name is used! error!

let user = { name: "John" };
let admin = { name: "Admin" };
function sayHi() {
  alert( this.name );
}
// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

function sayHi() {
  alert(this);
}
sayHi(); // undefined	


new Operations for Object Creation:
----------------------------------
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User("Jack");
alert(user.name); // Jack
alert(user.isAdmin); // false

Now if we want to create other users, we can call new User("Ann"), new User("Alice") and so on.

any function can be used as a constructor. That is: any function can be run with new.

The below constructor can’t be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.

let user = new function() {
  this.name = "John";
  this.isAdmin = false;
  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};

Check if function is called with new or not:
-------------------------------------------
new.target property:
-------------------
It is empty for regular calls and equals the function if called with new:

function User() {
  alert(new.target);
}
// without "new":
User(); // undefined
// with "new":
new User(); // function User { ... }

function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
    }
  this.name = name;
}
let john = User("John"); // redirects call to new User
alert(john.name); // John

function User(name) {
  this.name = name;
  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}
let john = new User("John");
john.sayHi(); // My name is: John
/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/

