var fs = require('fs');

/*
//readFileSync(동기적) -> 파일을 읽는동안 다른 작업을 수행 못함
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//readFile(비동기적) -> 파일 읽기 동안에 다른 작업 수행 가능
console.log('A');
var result = fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');
