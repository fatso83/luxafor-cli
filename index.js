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
  .on("--help", () => {
    console.log("luxafor-cli -c red ");
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
}

function setColor(color, ...args) {
  Luxafor.init(function() {
    Luxafor.setLuxaforColor(Luxafor.colors[color], function() {
      console.log(`Set color to ${coloredColor(color)}`);
    });
  });
}
