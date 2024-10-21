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

if (args.display) {
  console.log('File content:');
  console.log(fileContent);
}

if (args.output) {
  try {
    fs.writeFileSync(args.output, fileContent, 'utf8');
  } catch (error) {
    console.error('Failed to write output file:', error.message);
    process.exit(1);
  }
}

if (!args.display && !args.output) {
  process.exit(0);
}
