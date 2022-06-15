In JavaScript, objects have a special hidden property [[Prototype]], that is either null or 
references another object. That object is called “a prototype”.
When we want to read a property from object, and it’s missing, JavaScript automatically takes 
it from the prototype. In programming, such thing is called “prototypal inheritance”.

The property [[Prototype]] is internal and hidden, but there are many ways to set it.
One of them is to use __proto__ , 

let animal = {
eats: true,
walk() {
alert("Animal walk");
}

};
let rabbit = {
jumps: true
};
rabbit.__proto__ = animal;

console.log(rabbit.eats); //true -> inherited from animal object
console.log(rabbit.jumps); //true
rabbit.walk(); // Animal walk

__proto__ is not the same as [[Prototype]] . That’s a getter/setter for it.

Prototype chain can be longer:
let longEar = {
    earLength: 10,
    __proto__: rabbit
};

longEar.walk(); // Animal walk
console.log(longEar.jumps); // true (from rabbit)

let babyrabbit = {
    type: "baby"
}
babyrabbit.__proto__ = longEar;

babyrabbit.walk(); // Animal walk
console.log(babyrabbit.jumps); // true (from rabbit)
console.log(babyrabbit.type); // baby

There are actually only two limitations:
1. The references can’t go in circles. JavaScript will throw an error if we try to assign
__proto__ in a circle.
2. The value of __proto__ can be either an object or null , other types (like primitives) are
ignored.

Writing doesn’t use prototype:
-----------------------------
The prototype is only used for reading properties.

let animal1 = {
    eats: true,
    walk() {
        console.log("animals walk method")
    }
}

let rabbit1 = {
    __proto__: animal1
}
rabbit1.walk = function () {
    console.log("Rabbits walk method")
}

animal1.walk(); //Animals walk method
rabbit1.walk(); //Rabbits walk method

//Calling Setter method
let user = {
    name: "John",
    surname: "Smith",
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
let admin = {
    __proto__: user,
    isAdmin: true
};
console.log(admin.fullName); // John Smith 
admin.fullName = "Alice Cooper"; // setter triggers!
console.log(admin.fullName); //Alice Cooper

Value if this:
----------------
the setter call admin.fullName = uses admin as this , not user

let animal2 = {
    walk() {
        if (!this.isSleeping) {
            console.log(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit2 = {
    name: "White Rabbit",
    __proto__: animal2
};

// modifies rabbit.isSleeping
rabbit2.sleep(); // adds isSlepping variable to rabbit and sets it as true
console.log(rabbit2.isSleeping); // true
console.log(animal2.isSleeping); // undefined (no such property in the prototype)
};

for…in loop
-----------
The for..in loops over inherited properties too.
let animal = {
eats: true
};
let rabbit = {
jumps: true,
__proto__: animal
};
// Object.keys only return own keys
console.log(Object.keys(rabbit)); // jumps
// for..in loops over both own and inherited keys
for(let prop in rabbit) console.log(prop); // jumps, then eats

obj.hasOwnProperty(key)  : it returns true if obj has its own (not inherited)
property named key .

// obj.hasOwnProperty(key)     
let animal4 = {
    eats: true
};
let rabbit4 = {
    jumps: true,
    __proto__: animal4
};
for (let prop in rabbit4) {
    let isOwn = rabbit4.hasOwnProperty(prop);
    if (isOwn) {
        console.log(`Our: ${prop}`); // Our: jumps
    } else {
        console.log(`Inherited: ${prop}`); // Inherited: eats
    }
}

following inheritance chain: rabbit inherits from animal , that inherits
from Object.prototype (because animal is a literal object {...} , so it’s by default),
and then null above it:
Where is the method rabbit.hasOwnProperty coming
from? We did not define it. Looking at the chain we can see that the method is provided by
Object.prototype.hasOwnProperty . In other words, it’s inherited.
…But why hasOwnProperty does not appear in for..in loop, like eats and jumps , if it
lists all inherited properties.
The answer is simple: it’s not enumerable. Just like all other properties of
Object.prototype , it has enumerable:false flag. That’s why they are not listed.

All other key/value-getting methods, such as Object.keys , Object.values and so on
ignore inherited properties

Working with prototype
----------------------
Here’s the code that creates a pair of objects, then modifies them.
Which values are shown in the process?

let animal = {
jumps: null
};

let rabbit = {
__proto__: animal,
jumps: true
};

console.log( rabbit5.jumps ); // true
delete rabbit5.jumps;
console.log( rabbit5.jumps ); // null
delete animal5.jumps;
console.log( rabbit5.jumps ); // undefined

F.prototype
-----------
new objects can be created with a constructor function, like new F() .
If F.prototype is an object, then new operator uses it to set [[Prototype]] for the new
object.

let animal6 = {
    eats: true
};

function Rabbit6(name) {
    this.name = name;
}
Rabbit6.prototype = animal6;

let rabbit6 = new Rabbit6("White Rabbit"); // rabbit.__proto__ == animal
console.log(rabbit6.eats); // true
console.log(rabbit6.name); // White Rabbit

Rabbit6.prototype = animal literally states the following: "When a new
Rabbit is created, assign its [[Prototype]] to animal ".

rabbit6.Rabbit6("Sai"); //error Rabbit6 is not a function

F.prototype only used at new F time
F.prototype property is only used when new F is called, it assigns [[Prototype]]
of the new object.
If, after the creation, F.prototype property changes ( F.prototype = <another
object> ), then new objects created by new F will have another object as
[[Prototype]] , but already existing objects keep the old one.

Every function has the "prototype" property even if we don’t supply it.
The default "prototype" is an object with the only property constructor that points back
to the function itself.

function Rabbit() {}
/* default prototype
    Rabbit.prototype = { constructor: Rabbit };
*/

We can check it:

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }
alert( Rabbit.prototype.constructor == Rabbit ); // true

Naturally, if we do nothing, the constructor property is available to all rabbits through
[[Prototype]]:

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }
let rabbit = new Rabbit(); // inherits from {constructor: Rabbit}
alert(rabbit.constructor == Rabbit); // true (from prototype)

We can use constructor property to create a new object using the same constructor as the
existing one.

function Rabbit(name) {
this.name = name;
alert(name);
}
let rabbit = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");


function Rabbit() {}
Rabbit.prototype = {
jumps: true
};
let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false

function Rabbit() {}
// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved



Or, alternatively, recreate the constructor property manually

Rabbit.prototype = {
jumps: true,
constructor: Rabbit
};
// now constructor is also correct, because we added it


let user = {
name: "John",
prototype: "Bla-bla" // no magic at all
};

Changing Prototype
------------------

function Rabbit() {}
Rabbit.prototype = {
eats: true
};
let rabbit = new Rabbit();
alert( rabbit.eats ); // true

We added one more string (emphasized), what alert shows now?

function Rabbit() {}
Rabbit.prototype = {
eats: true
};
let rabbit = new Rabbit();
Rabbit.prototype = {};
alert( rabbit.eats ); // true

function Rabbit() {}
Rabbit.prototype = {
eats: true
};
let rabbit = new Rabbit();
Rabbit.prototype.eats = false;
alert( rabbit.eats ); // false

function Rabbit() {}
Rabbit.prototype = {
eats: true
};
let rabbit = new Rabbit();
delete rabbit.eats;
alert( rabbit.eats ); // true

function Rabbit() {}
Rabbit.prototype = {
eats: true
};
let rabbit = new Rabbit();
delete Rabbit.prototype.eats;
alert( rabbit.eats ); // undefined


Create an object with the same constructor
------------------------------------------
