import { dbg, getInputLines } from "../lib/util.ts";

type Pos = { x: number; y: number };
type Grid = string[][];

async function main() {
    const rows = await getInputLines();
    const grid = rows.map((row) => row.trim().split(""));

    const MAX_NEIGHBOR_ROLLS = 3;

    const lookup = ({ x, y }: Pos): string | null => grid[y]?.[x] ?? null;
    const set = ({ x, y }: Pos, val: string) =>
        Boolean(grid[y]?.[x]) ? (grid[y][x] = val) : null;
    const remove = (pos: Pos) => set(pos, "_");

    let accessibleRolls = 0;

    let y = 0;
    while (y < grid.length) {
        let x = 0;
        while (x < grid[y].length) {
            if (lookup({ x, y }) === "@") {
                const neighborCoords = getNeighborCoords({ x, y });
                const neighborRolls = neighborCoords
                    .map((pos) => ({ ...pos, v: lookup(pos) }))
                    .filter(({ v }) => v === "@");

                if (neighborRolls.length <= MAX_NEIGHBOR_ROLLS) {
                    accessibleRolls += 1;
                    remove({ x, y });

                    const neighbor = neighborRolls[0];
                    if (
                        neighbor &&
                        (neighbor.y < y || (neighbor.y === y && neighbor.x < x))
                    ) {
                        x = neighbor.x;
                        y = neighbor.y;
                        continue;
                    }
                }
            }

            x++;
        }

        y++;
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

function fmtGrid(grid: Grid): string {
    return grid.map((row) => row.join("")).join("\n");
}

function displayGrid(grid: Grid) {
    console.log(fmtGrid(grid));
}

main();
