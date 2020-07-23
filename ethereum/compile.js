
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);   // to remove the build folder and its contents when we require

const campaignPath = path.resolve(__dirname,'contracts', 'Campaign.sol' );
const source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source,1).contracts;

// recreate the build folder
console.log(buildPath);
fs.ensureDirSync(buildPath);
//loop over output object having 2 contracts and save it separatly as two compled contract files
console.log(output);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(':','') + '.json'),
        output[contract]
    );
}
