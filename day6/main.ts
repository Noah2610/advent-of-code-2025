import { getInputLines } from "../lib/util.ts";

type Op = "+" | "*";
type Cell = { n: number } | { op: Op };
type Column = Cell[];

async function main() {
    const lines = await getInputLines();

    const columns: Column[] = [];

    const insert = (x: number, val: Cell) => {
        if (!columns[x]) {
            columns[x] = [];
        }
        columns[x].push(val);
    };

    for (const line of lines) {
        const cols = line.trim().split(/\s+/);
        for (let x = 0; x < cols.length; x++) {
            const cell = cols[x];
            switch (cell) {
                case "+":
                case "*": {
                    insert(x, { op: cell });
                    break;
                }
                default: {
                    const n = Number.parseInt(cell);
                    if (!Number.isFinite(n)) {
                        throw new Error(`Expected number at col ${x}: ${cell}`);
                    }
                    insert(x, { n });
                }
            }
        }
    }

    let answerTotal = 0;
    for (const col of columns) {
        const answer = calcColumn(col);
        answerTotal += answer;
    }

    console.log(`Grand total is ${answerTotal} of all columns' answers summed`);
}

function calcColumn(col: Column): number {
    let op: Op | null = null;
    const nums: number[] = [];
    for (const cell of col) {
        if ("n" in cell) {
            nums.push(cell.n);
            continue;
        }
        op = cell.op;
    }

    switch (op) {
        case null: {
            throw new Error("Expected operator (+/*) in column");
        }
        case "+": {
            return nums.reduce((sum, n) => sum + n, 0);
        }
        case "*": {
            return nums.reduce((sum, n) => sum * n, 1);
        }
        default: {
            throw new Error("unreachable");
        }
    }
}

main();
