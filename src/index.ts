import OsxBluetoothController from "./bluetooth/osxBluetoothController";
import args from './arguments'

console.log(args)

async function init() {
  try {
    const btController = new OsxBluetoothController()

    console.log(await btController.list())
  } catch(err) {
    console.log(err)
  }
}

init()


