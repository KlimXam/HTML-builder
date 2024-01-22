const fs = require('fs');
const filePath = './02-write-file/klim.txt';
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Приветствую! Введите ваш текст:');

process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input.toLowerCase() === 'exit') {
    console.log('Пока-пока!');
    process.exit();
  }
  writeStream.write(input + '\n');
});
process.on('SIGINT', () => {
  console.log('Пока-пока!');
  process.exit();
});