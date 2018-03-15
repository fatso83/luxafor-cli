#!/usr/bin/env node

"use strict";

const Luxafor = require("luxafor")();
const program = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const packageJson = JSON.parse(
  fs.readFileSync(__dirname + "/package.json").toString()
);
const _ = require("lodash");
const coloredColor = c => (c in chalk ? chalk[c](c) : c);
const args = process.argv.slice(2);

program
  .version(packageJson.version)
  .option("-c, --color <color|r,g,b|off>", "Example: `-c red`, `-c 255,0,255`")
  .option("-l, --list", "Lists available colors")
  .option("-b, --blink <r,g,b>", "Blink a rgb color")
  .option("-v, --verbose", "Verbose output")
  .on("--help", () => {
    console.log("\nUsage: luxafor-cli -c red ");
  })
  .parse(process.argv);

if (program.args.length) {
  outputError(
    `You supplied arguments that were not prefixed by an option flag: "${
      program.args
    }". Aborting.`
  );
  process.exit(1);
}

if (program.list) {
  console.log(
    `Available colors: ${_.keys(Luxafor.colors)
      .map(coloredColor)
      .join(", ")}`
  );
  process.exit(0);
}

if (program.color) {
  setColor(program.color);
} else if (program.blink) {
  blinkRgbColor(program.blink);
}

function isRgb(color) {
  return color.match(/^\d+,\d+,\d+$/);
}

function getRgb(color) {
  return color.split(",").map(n => parseInt(n, 10));
}

function setColor(color) {
  Luxafor.init(function() {
    if (isRgb(color)) {
      const [r, g, b] = getRgb(color);
      Luxafor.setColor(r, g, b, function() {
        program.verbose && console.log(`Set color to ${coloredColor(color)}`);
      });
    } else {
      Luxafor.setLuxaforColor(Luxafor.colors[color], function() {
        program.verbose && console.log(`Set color to ${coloredColor(color)}`);
      });
    }
  });
}

function blinkRgbColor(color) {
  Luxafor.init(function() {
    const [r, g, b] = getRgb(color);
    Luxafor.flashColor(r, g, b, function() {
      console.log("Blinking set");
    });
  });
}
