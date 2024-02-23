var fs = require('fs');

// fs.appendFile('myfirstfile.txt','hello content!',function(err){
//     if (err) throw err;
//     console.log('File Saved!')
// })

// fs.writeFile('myfirstfile.txt', 'w',function(err){
//     if (err) throw err;
//     console.log('File Saved!')
// })

// fs.rename('myfirstfile.txt', 'myrenamedfile.txt',function(err){
//     if (err) throw err;
//     console.log('File Renamed!')
// })


fs.unlink('myrenamedfile.txt', function(err){
    if (err) throw err;
    console.log('File deleted!')
})