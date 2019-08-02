export default class Device {
  private _name:string
  private _address:string

  constructor({ name, address }) {
    this._name = name
    this._address = address
  }

  get name() {
    return this.name
  }

  get address() {
    return this.address
  }

  set name(value) {
    this._name = value
  }

  set address(value) {
    this._address = value
  }

}
