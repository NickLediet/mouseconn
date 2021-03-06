import { IBluetoothInterface } from "./bluetoothController.interface";
import { asyncExec } from '../lib'
import Device from "./device.model";

export default class OsxBluetoothController implements IBluetoothInterface {
  readonly COMMAND_LIST = 'blueutil --paired'

  /**
   * Format blueutil device string into a Device Object
   * @param deviceString result string of device from blueutil call
   * @return Device
   */
  private deviceFormat(deviceString): Device {
    const deviceObject =
      deviceString.split(',') // Split the list
                  .map(s => s.trim()) // Remove trailing whitespace
                  .filter(s => /^(name|address)/.test(s)) // Only keep desired properties
                  .reduce((acc, tar) => { // Create the constructor object
                    const targetArray = tar.split(':')
                    return {
                      ...acc,
                      [targetArray[0]]: targetArray[1].trim()
                    }
                  }, {})

    return new Device(deviceObject)
  }

  /**
   * @inheritdoc
   */
  async list(): Promise<Device[]> {
    try {
      const {stdout, stderr} = await asyncExec(this.COMMAND_LIST)

      if(stderr) {
        throw new Error(stderr)
      }

      let devices = stdout.split("\n")

      return devices.map(this.deviceFormat)

    } catch(err) {

    }
  }

  /**
   * @inheritdoc
   */
  query() {
    throw new Error("Method not implemented.");
  }

  /**
   * @inheritdoc
   */
  connect() {
    throw new Error("Method not implemented.");
  }

  /**
   * @inheritdoc
   */
  purge() {
    throw new Error("Method not implemented.");
  }
}
