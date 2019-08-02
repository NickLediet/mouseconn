/**
 * preinstall.js
 * run scripts based of enviroment to bootstrap bluetooth dependencies
 */
const os = require('os')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Return consistant object for loggin/destructuring
async function executeScripts(){
  if (os.platform === 'win32') {
    // TODO: Add verification for Set-ExecutionPolicy RemoteSigned so that
    //       Powershell scripts can be exectute ( not set by default on windows )
    return await exec(`pwsh ${__dirname}/preinstall.ps1`)
  } else {
    return await exec(`bash ${__dirname}/preinstall.sh`)
  }
}

async function init() {
  try {
    const { stdout, stderr } = await executeScripts() // TODO: Add some kind of error handling for pwsh exectuion policy
    console.log(stdout)
  } catch(err) {
    console.log(err)
    process.exit()
  }
}

init()
