const Luxafor = require("luxafor")();
const _ = require("lodash");

const args = process.argv.slice(2);

switch (args[0]) {
  case "-c":
    doCommand(...args.slice(1));
    break;
  case "-h":
  default:
    printUsage();
}

function printUsage() {
  console.log("-c <command> <command arg>   command");
  console.log("-h                           Show help");
  console.log(`\nCommands and arguments:
    off             Turn off Luxafor
    color <color>   Set color
    `);
  console.log(`\nColors: ${_.keys(Luxafor.colors).join(",")}`);
}

function doCommand(command, ...args) {
  Luxafor.init(function() {
    if (command === "color" || command === "off") {
      const color = command === "off" ? "off" : args[0];
      Luxafor.setLuxaforColor(Luxafor.colors[color], function() {
        console.log("done");
      });
    } else {
      console.log("No matching command");
    }
  });
}
