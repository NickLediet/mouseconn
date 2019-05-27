module.exports = require('yargs')
  .scriptName(__dirname)
  .usage('$0 <cmd> [args]')
  .alias('d', 'device')
  .nargs('d', 1)
  .describe('d', 'the ssid of the bluetooth device you wish to connect')
  .string('d')
  .help().argv;
