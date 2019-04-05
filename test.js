const bluetoothctl = require('bluetoothctl')

bluetoothctl.Bluetooth()

bluetoothctl.on(bluetoothctl.bluetoothEvents.Device, devices => {
    const device = devices.filter(d => d.name === 'MX Anywhere 2S')
    if(!!device.length) {
        console.log(device)
        bluetoothctl.scan(false)
    
        process.exit()
    }
})

bluetoothctl.scan(true)

