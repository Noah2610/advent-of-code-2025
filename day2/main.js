#!/usr/bin/env node

import fs from "node:fs/promises";

async function main() {
    const content = (await getInput()).replace(/\n/g, "");

    let invalidIdsSum = 0;
    const ranges = content.split(",");

    for (const range of ranges) {
        const [first, last] = range.split("-").map(Number);

        for (let id = first; id <= last; id++) {
            const s = id.toString();
            if (s.length % 2 !== 0) {
                continue;
            }

            const mid = Math.floor(s.length / 2);
            const firstHalf = s.slice(0, mid);
            const secondHalf = s.slice(mid);

            if (firstHalf === secondHalf) {
                console.log(`id ${id} is invalid`);
                invalidIdsSum += id;
            }
        }
    }

    console.log(`Sum of invalid IDs is ${invalidIdsSum}`);
}

async function getInput() {
    const file = process.env.DEV ? "./input-dev.txt" : "./input.txt";
    return (await fs.readFile(file, "utf8")).trim();
}

main();
