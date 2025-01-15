"use strict";

///////////////////////////////////////
// 007 Scoping in Practice

/* function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
} */

// 009 Hoisting & TDZ
console.log(me);
// console.log(job);
// console.log(year);

var me = "Rutu";
let job = "Intern";
const year = 2004;

console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
console.log(addArrow);
// console.log(addArrow(2, 3));

// functions
function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("all products deleted!");
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(x === window.y);
console.log(x === window.z);

// 011 This keyword
/* const calcAge = function (birthYear) {
  console.log(2024 - birthYear);
  console.log(this);
};
calcAge(2004);

const calcArrow = (birthYear) => {
  console.log(2024 - birthYear);
  console.log(this);
};
calcArrow(2004);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2004,
};

// borrow method without copying
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

// const f = jonas.calcAge;
// f(); */

// 012 regular fun vs arrow fun

// var firstName = "janki";

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet();
jonas.calcAge();

// arguments keyword
const addExpr1 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
// addArrow(2, 5, 8);

// 013 primitive vs objects
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge); 

const my = {
    name: 'rutu',
    age: 20,
};

const friend = my;
friend.age = 22;
console.log("friend:", friend);
console.log("my:", my);

// 014 primitive vs objects

// primitive types
let lastName = 'Koladiya';
let oldLastnmae = lastName;
lastName = 'Dolariya';
console.log(lastName, oldLastnmae);

// reference types
const rutu = {
    firstName: 'rutu',
    lastName: 'koladiya',
    age: 28,
};

const marriedRutu = rutu;
marriedRutu.lastName = 'Dolariya';
console.log('before mrg:', rutu);
console.log('after mrg:', marriedRutu);

// marriedRutu = {};

// copying objects
const rutu2 = {
    firstName: 'rutu',
    lastName: 'koladiya',
    age: 28,
    family: ['mumma', 'dadz'],
};

const rutuCopy = Object.assign({}, rutu2);
rutuCopy.lastName = 'Dolariya';

rutuCopy.family.push('mary');
rutuCopy.family.push('john');

console.log('before mrg:', rutu2);
console.log('after mrg:', rutuCopy);

/* const jessica1 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
  };
  
  function marryPerson(originalPerson, newLastName) {
    originalPerson.lastName = newLastName;
    return originalPerson;
  }
  
  const marriedJessica = marryPerson(jessica1, 'Davis');
  
  // const marriedJessica = jessica1;
  // marriedJessica.lastName = 'Davis';
  
  console.log('Before:', jessica1);
  console.log('After:', marriedJessica);
  
  const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    familiy: ['Alice', 'Bob'],
  };
  
  // Shallow copy
  const jessicaCopy = { ...jessica };
  jessicaCopy.lastName = 'Davis';
  
  // jessicaCopy.familiy.push('Mary');
  // jessicaCopy.familiy.push('John');
  
  // console.log('Before:', jessica);
  // console.log('After:', jessicaCopy);
  
  // Deep copy/clone
  const jessicaClone = structuredClone(jessica);
  jessicaClone.familiy.push('Mary');
  jessicaClone.familiy.push('John');
  
  console.log('Original:', jessica);
  console.log('Clone:', jessicaClone);
  */

