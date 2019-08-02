import Device from "./device.model";

export interface IBluetoothInterface {
  /**
   * Get all devices currently paired to host
   */
  list(): Promise<Device[]>

  /**
   * Query desired device to pair with
   */
  query()

  /**
   * Connect to desired device
   */
  connect()

  /**
   * Purge previous entries of device ssid
   */
  purge()
}
