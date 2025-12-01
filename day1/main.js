#!/usr/bin/env node

import fs from "node:fs/promises";

async function main() {
    const input = await getInput();

    // dial starts at 50
    let index = 50;
    let zeroCount = 0;

    console.log(`starting index: ${index}`);

    for (const line of input.split("\n")) {
        const delta = parseInstruction(line);

        index = mod(index + delta, 100);

        console.log(`${line} -> ${delta} -> ${index}`);

        if (index === 0) {
            console.log("^^^ POINTS AT ZERO");
            zeroCount++;
        }
    }

    console.log(`Dial pointed at 0 ${zeroCount} times`);
}

function mod(a, b) {
    return ((a % b) + b) % b;
}

function parseInstruction(instr) {
    const [dir, ...rest] = instr;
    const sign = dir === "R" ? 1 : -1;

    return sign * Number.parseInt(rest.join(""));
}

async function getInput() {
    // return `
    // L68
    // L30
    // R48
    // L5
    // R60
    // L55
    // L1
    // L99
    // R14
    // L82`.trim();

    return (await fs.readFile("./input.txt", "utf8")).trim();
}

main();
