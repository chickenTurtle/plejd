# Set Dim Level Feature

This feature allows you to set the dim level of Plejd lights without turning them on. This is perfect for scenarios where you want to pre-configure the brightness level that will be used when someone turns the light on.

## Use Cases

- **Morning routine**: Set bedroom lights to a low brightness level so when your partner wakes up and turns on the light, it's already at a comfortable dim level
- **Evening preparation**: Pre-set lights to a warm, dim level for a cozy atmosphere
- **Automation**: Use with Home Assistant automations to set dim levels based on time of day or other conditions

## How It Works

The feature adds a new `setDimLevel()` method to the `PlejdDeviceCommunication` class that:

1. **Validates the device**: Checks if the device exists and is dimmable
2. **Validates brightness**: Ensures brightness is between 0-255
3. **Smart behavior**:
   - If the light is **currently on**: Changes the brightness immediately
   - If the light is **currently off**: Sets the brightness level for when it's turned on later

## MQTT Integration

The feature integrates with MQTT through a new command type. Send a JSON payload to the device's set topic:

```json
{
  "dimLevel": 25,
  "transition": 5
}
```

### MQTT Topic Format

```
homeassistant/light/plejd/{device_id}/set
```

### Parameters

- `dimLevel` (required): Brightness level from 0-255
- `transition` (optional): Transition time in seconds for smooth dimming

## Usage Examples

### Using the Example Script

```bash
# Set bedroom light to 25% brightness
node example_dim_level.js "light_bedroom_main" 25

# Set with 5-second transition
node example_dim_level.js "light_bedroom_main" 10 5
```

### Using Home Assistant

You can create Home Assistant automations that send MQTT commands:

```yaml
automation:
  - alias: 'Set bedroom light to low brightness'
    trigger:
      - platform: time
        at: '22:00:00'
    action:
      - service: mqtt.publish
        data:
          topic: 'homeassistant/light/plejd/light_bedroom_main/set'
          payload: '{"dimLevel": 15}'
```

### Using MQTT Directly

```bash
# Using mosquitto_pub
mosquitto_pub -h localhost -t "homeassistant/light/plejd/light_bedroom_main/set" -m '{"dimLevel": 20}'
```

## Implementation Details

### Files Modified

1. **PlejdDeviceCommunication.js**: Added `setDimLevel()` method and `_setDimLevelOnly()` helper
2. **PlejdAddon.js**: Added MQTT command handling for `dimLevel`
3. **PlejdBLEHandler.js**: Added `COMMANDS.SET_DIM_LEVEL` BLE command that sets brightness without turning on
4. **constants.js**: Added `SET_DIM_LEVEL` command constant

### Key Features

- **Validation**: Comprehensive input validation
- **Smart behavior**: Different behavior for on/off lights
- **Transition support**: Optional smooth transitions
- **Error handling**: Proper logging and error messages
- **MQTT integration**: Seamless integration with existing MQTT infrastructure

## Testing

The feature has been designed to be safe and non-destructive:

- Only affects dimmable devices
- Validates all inputs
- Provides clear logging
- Gracefully handles errors

You can test it safely on any dimmable light in your Plejd system.
