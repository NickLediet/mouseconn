#!/usr/bin/env node
/**
 * @deprecated
 */
console.warn(`${__dirname}/index.js is deprecated and will be removed soon. \nPlease use use compiled ts script @ ${__dirname}/dist/index.js`)

const args = require('./arguments')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const bluetoothctl = require('bluetoothctl')

const desiredDeviceName = args.device

async function main() {
    try{
        const { stdout, stderr } = await exec('bt-device -l')

        if(stderr) throw new Error(stderr)

        const [,...foundDevices] = stdout.split('\n') // Remove 'Added devices:' label

        const devices = foundDevices
            .filter(d => !!d)
            .map(d => {
                const matches = d.match(/\((.+)\)$/)
                const name = d.replace(matches[0], '').replace(/\s$/, '')

                const device = {
                    name,
                    address: matches[1]
                }

                return device
            })

        devices.forEach(async d => {
            if(d.name !== desiredDeviceName) {
                return;
            }
            try {
                const {stdout, stderr} = await exec(`bt-device -r ${d.address}`) // Remove all duplicates

                if(!!stderr) throw new Error(stderr)

                console.log(stdout)
            } catch(error) {
                console.error(error)
            }
        })

        bluetoothctl.Bluetooth()

        bluetoothctl.on(bluetoothctl.bluetoothEvents.Device, async devices => {
            const device = devices.filter(d => d.name === desiredDeviceName)

            if(!!device.length) {
                try {
                    //Connect
                    const { stdout, stderr } = await exec(`bt-device -c ${device[0].mac}`)

                    if(!!stderr) throw new Error(stderr)

                    bluetoothctl.scan(false)

                    process.exit()

                } catch(error) {
                    console.error(error)
                }
            }
        })

        bluetoothctl.scan(true)
    } catch(err) {
        console.error(err)
    }
}

main()
