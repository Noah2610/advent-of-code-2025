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
            const mid = Math.floor(s.length / 2);

            let isValid = true;

            // console.log({ id, mid });

            len: for (let len = mid; len > 0; len--) {
                if (s.length % len !== 0) {
                    continue;
                }

                const parts = s.length / len;
                let lastPart = null;

                // console.log({ len, parts });

                for (let i = 0; i < parts; i++) {
                    const offset = i * len;
                    const part = s.slice(offset, offset + len);

                    // console.log({ i, part, lastPart });

                    if (lastPart === null) {
                        lastPart = part;
                    } else {
                        if (lastPart !== part) {
                            // parts differ, id with parts of this len is valid
                            continue len;
                        }
                    }
                }

                isValid = false;
                break;
            }

            if (!isValid) {
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
