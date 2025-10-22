const COMMANDS = {
  TURN_ON: 'Turn on',
  TURN_OFF: 'Turn off',
  DIM: 'Dim',
  SET_DIM_LEVEL: 'Set dim level',
  TRIGGER_SCENE: 'Trigger scene',
  BUTTON_CLICK: 'Button click',
};

const DBUS = {
  OM_INTERFACE: 'org.freedesktop.DBus.ObjectManager',
  PROP_INTERFACE: 'org.freedesktop.DBus.Properties',
};

const BLUEZ = {
  SERVICE_NAME: 'org.bluez',
  ADAPTER_ID: 'org.bluez.Adapter1',
  DEVICE_ID: 'org.bluez.Device1',
  GATT_SERVICE_ID: 'org.bluez.GattService1',
  GATT_CHAR_ID: 'org.bluez.GattCharacteristic1',
};

// BLE Protocol Constants
const BLE = {
  UUID_SUFFIX: '6085-4726-be45-040c957391b5',
  COMMANDS: {
    REMOTE_CLICK: 0x0016,
    TIME_UPDATE: 0x001b,
    SCENE_TRIGGER: 0x0021,
    STATE_CHANGE: 0x0097,
    DIM_CHANGE: 0x00c8,
    COLOR_CHANGE: 0x0420,
  },
  BROADCAST_DEVICE_ID: 0x01,
};

const PLEJD_UUIDS = {
  PLEJD_SERVICE: `31ba0001-${BLE.UUID_SUFFIX}`,
  LIGHTLEVEL_UUID: `31ba0003-${BLE.UUID_SUFFIX}`,
  DATA_UUID: `31ba0004-${BLE.UUID_SUFFIX}`,
  LAST_DATA_UUID: `31ba0005-${BLE.UUID_SUFFIX}`,
  AUTH_UUID: `31ba0009-${BLE.UUID_SUFFIX}`,
  PING_UUID: `31ba000a-${BLE.UUID_SUFFIX}`,
};

module.exports = { COMMANDS, DBUS, BLUEZ, BLE, PLEJD_UUIDS };
