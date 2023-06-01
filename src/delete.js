const fs = require('fs');

const folder = "../wallet_credentials";

function cleaning(path) {
  fs.readdir(path, (err, files) => {
    if(err) throw err;
    
    console.log(files);
    for (let file of files) {
      fs.stat(path + "/" + file, (err) => {
        if(err) throw err;
        fs.unlink(path + "/" + file, err => {
          if(err) throw err;
          console.log('File deleted:', path + "/" + file);
        });
      });
    }
  });
}

async function main() {
  cleaning(folder);
}

main();