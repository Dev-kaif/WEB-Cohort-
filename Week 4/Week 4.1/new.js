const fs = require('fs');
const { Command } = require('commander');
const { constants, isUtf8 } = require('buffer');

const program = new Command();

program.name("counter")
       .description("CLI to do file based task")
       .version("0.2.5");

program.command("count")
       .description("count the number of words in a file")
       .argument("<file>", "file to count")
       .option("-s, --sentence")
       .action((file, options) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (options.sentence) {
                        let numSentences = data.split("\n").length;
                        console.log(`Number of sentences: ${numSentences}`);
                    } else {
                        let numWords = data.split(" ").length;
                        console.log(`Number of words: ${numWords}`);
                    }
                }
            });
       });

program.parse(process.argv);
