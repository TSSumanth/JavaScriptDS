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


