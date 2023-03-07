//numeros aleatorios del 1 al 20
// const random = require('./numeros');
// console.log(random.randomNumber(1,20));



for (let i = 0; i < 10000 ; i++) {
    console.log(Math.floor(Math.random() * (20) + 1));
}