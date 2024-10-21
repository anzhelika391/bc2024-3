const fs = require('fs');
const { Command } = require('commander');
const cli = new Command();

cli
  .option('-i, --input <file>', 'Specify the input file path')
  .option('-o, --output <file>', 'Specify the output file path')
  .option('-d, --display', 'Print the content to the console');

cli.parse(process.argv);
const args = cli.opts();

if (!args.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(args.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

let fileContent;
try {
  fileContent = fs.readFileSync(args.input, 'utf8');
} catch (error) {
  console.error('Failed to read input file:', error.message);
  process.exit(1);
}

// Парсимо JSON
let jsonData;
try {
  jsonData = JSON.parse(fileContent);
} catch (error) {
  console.error('Failed to parse JSON:', error.message);
  process.exit(1);
}

// Обробка даних
const results = jsonData.map(item => {
  const stockCode = item.StockCode || 'UnknownStockCode';  // виправлено
  const valCode = item.ValCode || 'UnknownValCode';        // виправлено
  const attraction = item.Attraction || 0;
  return `${stockCode}-${valCode}-${attraction}`;          // виправлено
});

// Вивід результатів
if (args.display) {
  console.log('Formatted results:');
  results.forEach(result => console.log(result));
}

// Запис у файл, якщо зазначений
if (args.output) {
  try {
    fs.writeFileSync(args.output, results.join('\n'), 'utf8');
  } catch (error) {
    console.error('Failed to write output file:', error.message);
    process.exit(1);
  }
}

// Завершення, якщо не потрібно нічого виводити
if (!args.display && !args.output) {
  process.exit(0);
}
