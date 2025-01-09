// 004
let js = "amazing";
// if (js === "amazing") alert("JS is FUN!");

console.log(40 + 9 + 23 - 10);

//005 var
console.log("Hello Developers!");

let firstName = "Rutu";
console.log(firstName);

//007 data types
// js has dynamic typing, data types determind automatically

let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof true);
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "Rutu");

javascriptIsFun = "yes";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 2004;
console.log(typeof year);

console.log(typeof null); // object

//008 var, let, const
const birthYear = 2004;
// birthYear = 2010;  not possible
// const job; also

var job = "programmer";
job = "teacher";

lastName = "Koladiya";
console.log(lastName);

//009 operators
const now = 2024;
const ageRutu = 2024 - 2004;
const ageMaitik = 2024 - 2010;
console.log(ageRutu, ageMaitik);
console.log(ageRutu * 2, ageRutu / 10, 2 ** 3);

// const firstName = "Rutu";
// const lastName = "Koladiya";
// console.log(firstName + ' ' + lastName);
let x = 10 + 5;
x += 10; // x = x + 10 = 25
x *= 4;
console.log(x);

console.log(ageRutu > ageMaitik);

//010 operator precedence
const averageAge = (ageRutu + ageMaitik) / 2;
console.log(averageAge);

//012 strings & template literals
const studentName = "Rutu";
const studentDeg = "B.E.";
const stuBirthYear = 2004;
const runningYear = 2024;

const rutu =
  "I'm " +
  studentName +
  ", a " +
  (runningYear - stuBirthYear) +
  " years old " +
  job +
  "!";
console.log(rutu);

const rutuNew = `I'm ${studentName}, a ${
  runningYear - stuBirthYear
} years old ${job}!`;
console.log(rutuNew);
console.log(`just a 
    regular string..`);
// console.log(
//   "just a \n\
// regular string.."
// );

//013 if-else

const age = 15;
const isOldEnough = age > 18;

if (isOldEnough) {
  console.log("Rutu can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(`Rutu is too young, Wait another ${yearsLeft} years!`);
}

//015 type conversion

// type convesion
const inputYear = "2004";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);

console.log(Number("rutu")); // NaN
console.log(typeof NaN);

console.log(String(23)); // NaN

// type coercion
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" / "2");

let n = "1" + 1; // '11'
n = n - 1;
console.log(n);

//016 truthy n falsy value
// 5 falsy value: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({}));
console.log(Boolean(""));

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}

// == & === operator
const ageOf = "18";
if (age === 18) console.log("You just became an adult :D (strict)");

if (ageOf == 18) console.log("You just became an adult :D (loose)");

// const favourite = Number(prompt("What's your favourite number?"));
// console.log(favourite);
// console.log(typeof favourite);

// if (favourite === 23) {
//   // 22 === 23 -> FALSE
//   console.log("Cool! 23 is an amzaing number!");
// } else if (favourite === 7) {
//   console.log("7 is also a cool number");
// } else if (favourite === 9) {
//   console.log("9 is also a cool number");
// } else {
//   console.log("Number is not 23 or 7 or 9");
// }

// if (favourite !== 23) console.log("Why not 23?");

//018 Boolean logic

//019 logic operation
const hasDriverLicense = true;
const hasGoodVision = false;

console.log(hasDriverLicense && hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense);

//021 switch statement

const day = "monday";

switch (day) {
  case "monday": // day === monday
    console.log("plan cousre..");
    console.log("go to coding meetup!");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend :D");
    break;
  default:
    console.log("Not a valid day!");
}

//022 statement and expression

//023 ternary operator ? t : f

//025 js release ES5, ES6+..
