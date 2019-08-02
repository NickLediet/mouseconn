import OsxBluetoothController from "./bluetooth/osxBluetoothController";

async function init() {
  try {
    const btController = new OsxBluetoothController()

    console.log(await btController.list())
  } catch(err) {
    console.log(err)
  }
}

init()


