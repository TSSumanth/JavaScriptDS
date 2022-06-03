let animal = {
    eats: true,
    walk() {
        console.log("Animal walks")
    }
};
let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

console.log(rabbit.eats); //true -> inherited from animal object
console.log(rabbit.jumps); //true
rabbit.walk(); //Animal Walks

//ProtoType chaining
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

//Writing or setters in Prototype
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


// Understanding this
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


let animal3 = {
    eats: true
};
let rabbit3 = {
    jumps: true,
    __proto__: animal
};
// Object.keys only return own keys
console.log(Object.keys(rabbit3)); // jumps
// for..in loops over both own and inherited keys
for (let prop in rabbit3)
    console.log(prop); // jumps, then eats

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
