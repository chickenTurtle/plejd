#!/usr/bin/env node

/**
 * Example script demonstrating how to use the new setDimLevel functionality
 *
 * This script shows how to set the dim level of lights without turning them on.
 * Perfect for scenarios like setting lights to a low brightness level when
 * someone wakes up and turns them on.
 *
 * Usage:
 *   node example_dim_level.js <device_id> <brightness_level> [transition_time]
 *
 * Examples:
 *   node example_dim_level.js "light_bedroom_main" 25
 *   node example_dim_level.js "light_bedroom_main" 10 5
 */

const mqtt = require('mqtt');

// Configuration - adjust these values for your setup
const MQTT_BROKER = 'mqtt://localhost:1883'; // or your MQTT broker address
const MQTT_TOPIC_PREFIX = 'homeassistant'; // adjust if different
const NODE_ID = 'plejd'; // adjust if different

function setDimLevel(deviceId, brightness, transition = null, password) {
  const client = mqtt.connect(MQTT_BROKER, {
    clientId: `example-dim-level_${Math.random().toString(16).substr(2, 8)}`,
    username: 'mqtt-api-user',
    password: password,
    protocolVersion: 4,
    queueQoSZero: true,
  });

  client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Construct the MQTT topic for the device
    const topic = `${MQTT_TOPIC_PREFIX}/light/${NODE_ID}/${deviceId}/set`;

    // Create the command payload
    const command = {
      dimLevel: brightness,
    };

    const payload = JSON.stringify(command);

    console.log(`Publishing to topic: ${topic}`);
    console.log(`Payload: ${payload}`);

    // Publish the command
    client.publish(topic, payload, (err) => {
      if (err) {
        console.error('Error publishing command:', err);
      } else {
        console.log(`Successfully set dim level to ${brightness} for device ${deviceId}`);
      }

      // Close the connection
      client.end();
    });
  });

  client.on('error', (err) => {
    console.error('MQTT connection error:', err);
  });
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node example_dim_level.js <device_id> <brightness_level> [transition_time]');
  console.log('');
  console.log('Examples:');
  console.log('  node example_dim_level.js "light_bedroom_main" 25');
  console.log('  node example_dim_level.js "light_bedroom_main" 10 5');
  console.log('');
  console.log('Brightness levels: 0-255 (0 = off, 255 = full brightness)');
  console.log('Transition time: seconds for smooth dimming (optional)');
  process.exit(1);
}

const deviceId = args[0];
const brightness = parseInt(args[1], 10);
const password = args[2];

if (isNaN(brightness) || brightness < 0 || brightness > 255) {
  console.error('Error: Brightness must be a number between 0 and 255');
  process.exit(1);
}

console.log(`Setting dim level for device "${deviceId}" to ${brightness}`);

setDimLevel(deviceId, brightness, password);
