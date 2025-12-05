import { dbg, getInputLines } from "../lib/util.ts";

type Ids = Set<number>;
type IdRange = [number, number];
type IdRanges = IdRange[];

async function main() {
    const lines = await getInputLines();

    const freshIdRanges: IdRanges = [];
    const availableIds: Ids = new Set();

    let segment: 0 | 1 = 0;

    const pad = (n: number, l = 3) => n.toString().padStart(l, "0");

    for (let i = 0; i < lines.length; i++) {
        console.log(
            `[${pad(i)}/${pad(lines.length)}] ${(
                (i / lines.length) *
                100
            ).toFixed(2)}%`,
        );

        const line = lines[i].trim();

        if (line === "") {
            segment = (segment ^ 1) as 0 | 1;
            continue;
        }

        switch (segment) {
            case 0: {
                freshIdRanges.push(parseIdRange(line));
                break;
            }
            case 1: {
                availableIds.add(Number.parseInt(line));
                break;
            }
            default: {
                throw new Error("Unreachable");
            }
        }
    }

    const hasFresh = (id: number): boolean => {
        for (const range of freshIdRanges) {
            if (id >= range[0] && id <= range[1]) {
                return true;
            }
        }
        return false;
    };

    let totalFreshAndAvailable = 0;

    for (const id of availableIds) {
        if (hasFresh(id)) {
            totalFreshAndAvailable += 1;
        }
    }

    console.log(
        `A total of ${totalFreshAndAvailable} items are available and fresh`,
    );
}

function parseIdRange(line: string): IdRange {
    const [min, max] = line.split("-").map(Number);
    return [min, max];
}

main();
