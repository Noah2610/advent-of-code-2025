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

        const start = index;
        const end = mod(index + delta, 100);
        index = end;

        const loops = Math.floor(Math.abs(delta) / 100);

        const sign = Math.sign(delta);

        if (
            start !== 0 &&
            (end === 0 ||
                (sign > 0 && end < start) ||
                (sign < 0 && end > start))
        ) {
            console.log("vvv passed 0");
            zeroCount++;
        }

        zeroCount += loops;
        if (loops > 0) {
            console.log(`vvvv additional ${loops} loops`);
        }

        console.log(
            `${line} -> ${start} ${Math.sign(delta) > 0 ? "+" : "-"} ${Math.abs(
                delta,
            )} -> ${end}\n  ${zeroCount} zeroes counted`,
        );
    }

    console.log(`Dial pointed at 0 ${zeroCount} times`);
}

function mod(a, b) {
    return ((a % b) + b) % b;
}

function parseInstruction(instr) {
    const [dir, ...rest] = instr.trim();
    const sign = dir === "R" ? 1 : -1;
    const num = Number.parseInt(rest.join(""));
    return sign * num;
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
