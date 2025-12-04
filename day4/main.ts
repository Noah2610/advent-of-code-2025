import { getInputLines } from "../lib/util.ts";

type Pos = { x: number; y: number };

async function main() {
    const rows = await getInputLines();

    const MAX_NEIGHBOR_ROLLS = 3;

    const lookup = ({ x, y }: Pos): string | null => rows[y]?.[x] ?? null;

    let accessibleRolls = 0;

    for (let y = 0; y < rows.length; y++) {
        const row = rows[y];

        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            if (cell !== "@") continue;

            const neighborCoords = getNeighborCoords({ x, y });
            const neighborRolls = neighborCoords
                .map(lookup)
                .filter(Boolean)
                .reduce(
                    (count, neighbor) => (neighbor === "@" ? count + 1 : count),
                    0,
                );

            if (neighborRolls <= MAX_NEIGHBOR_ROLLS) {
                accessibleRolls += 1;
            }
        }
    }

    console.log(`There are ${accessibleRolls} accessible rolls of paper`);
}

function getNeighborCoords(pos: Pos): Pos[] {
    const neighborCoords: Pos[] = [];

    for (let dy = -1; dy <= 1; dy++) {
        const y = pos.y + dy;
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const x = pos.x + dx;
            neighborCoords.push({ x, y });
        }
    }

    return neighborCoords;
}

main();
