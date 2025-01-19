const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');

const readline = require('readline');
const stream = fs.createWriteStream(path, 'utf-8');

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); // readline создает модуль для обработки потока ввода и вывода в консоль
// input: process.stdin - поток ввода
// input: process.stdout - поток вывода

console.log(
  'Hello! Write something in console. To exit type "exit" or press CTRL+C',
);

rlInterface.on('line', (input) => {
  stream.write(`${input}\n`);
  console.log(`"${input}" is a pretty wise thing to say`);

  if (input.toLowerCase() === 'exit') {
    rlInterface.close();
  }
}); // line срабатывает если пользователь вводит в консоль и нажимает Enter

rlInterface.on('close', () => {
  console.log('Goodbye!');
  stream.end();
}); // close срабатывает если закрылся интерфейс ввода-вывода (при нажатии ctrl+c или при явном вызове rlInterface.close())
