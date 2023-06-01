const ethers = require('ethers');
const fs = require('fs');

const folderName = "wallet_credentials";

function generate() {
  let phrase = ethers.Wallet.createRandom().mnemonic.phrase;
  let wallet = ethers.Wallet.fromPhrase(phrase);

  console.log("Generated wallet address:", wallet.address);

  fs.stat(`../${folderName}`, function(err) {
    if (!err) {
      // console.log('Folder exists');
      console.log('Credentials: cd ../wallet_credentials')
      fs.writeFileSync(`../${folderName}/address.txt`, wallet.address, "ascii");
      fs.writeFileSync(`../${folderName}/pkey.txt`, (wallet.privateKey).slice(2), "ascii"); // save w/o 0x
      fs.writeFileSync(`../${folderName}/mnemonic.txt`, phrase, "ascii");
      }
      else if (err.code === 'ENOENT') {
        fs.mkdir(`../${folderName}`, err => {
          if(err) throw err;
        });
        fs.writeFileSync(`../${folderName}/address.txt`, wallet.address, "ascii");
        fs.writeFileSync(`../${folderName}/pkey.txt`, (wallet.privateKey).slice(2), "ascii"); // save w/o 0x
        fs.writeFileSync(`../${folderName}/mnemonic.txt`, phrase, "ascii");
      }
  });
  /*
  successString = "Wallet: " + wallet.address + "\n\nPrivate Key: " + (wallet.privateKey) + "\n\n12 word phrase: " + phrase;
  fs.writeFileSync('./Success.txt', successString, (err) => {  
    if (err) throw err; 
  })
  */
}

async function main() {
  generate();
}

main();

