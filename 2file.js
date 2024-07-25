const fs = require('fs');

// sync...- write
// fs.writeFileSync('./test.txt', 'Kanchi chauhan') // created a file

// asyncv - write
// fs.writeFile('./test.txt', 'hi kanchi async', (err) => console.log(err));

// sync - read
const result = fs.readFileSync('./contact.txt', 'utf-8');
console.log(result)

// async - read
fs.readFile('./contact.txt', 'utf-8', (err, result) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log(result);
    }
});

// append File
fs.appendFileSync('./test.txt', '234\n')

// copy a file
fs.cpSync('./test.txt', './copy.txt')

// delete a file
fs.unlinkSync('./copy.txt')

// file statistics
console.log(fs.statSync('./test.txt'));

// create a folder
// fs.mkdirSync('my-docs')

// recursively create folders inside my-docs
fs.mkdirSync('my-docs/a/b', {recursive: true})