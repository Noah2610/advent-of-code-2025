import { getInputLines } from "../lib/util.ts";

type Op = "+" | "*";
type Cell = string;
type Column = Cell[];

async function main() {
    const lines = await getInputLines();

    const w = lines.reduce(
        (acc, line) => (line.length > acc ? line.length : acc),
        0,
    );
    const h = lines.length;

    let totalAnswer = 0;
    let nums: number[] = [];
    let op: Op | null = null;

    for (let x = w - 1; x >= 0; x--) {
        let word = "";

        for (let y = 0; y < h; y++) {
            const c = lines[y][x];
            switch (c) {
                case " ": {
                    break;
                }
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9": {
                    word += c;
                    break;
                }
                case "+":
                case "*": {
                    op = c;
                    break;
                }
            }
        }

        const num = Number.parseInt(word);
        if (Number.isFinite(num)) {
            nums.push(num);
        }

        if (op) {
            switch (op) {
                case "+": {
                    totalAnswer += nums.reduce((sum, n) => sum + n, 0);
                    break;
                }
                case "*": {
                    totalAnswer += nums.reduce((sum, n) => sum * n, 1);
                    break;
                }
            }

            op = null;
            nums = [];
        }
    }

    console.log(`Grand total is ${totalAnswer} of answers' summed`);

    // const columns: Column[] = [];

    // const insert = (x: number, val: Cell) => {
    //     if (!columns[x]) {
    //         columns[x] = [];
    //     }
    //     columns[x].push(val);
    // };

    // for (const line of lines) {
    //     const cols = line.split(/\s+/);
    //     for (let x = 0; x < cols.length; x++) {
    //         const cell = cols[x];
    //         switch (cell) {
    //             case "*": {
    //                 insert(x, { op: cell });
    //                 break;
    //             }
    //             default: {
    //                 insert(x, { n: cell });
    //                 // const n = Number.parseInt(cell);
    //                 // if (!Number.isFinite(n)) {
    //                 //     throw new Error(`Expected number at col ${x}: ${cell}`);
    //                 // }
    //                 // insert(x, { n });
    //             }
    //         }
    //     }
    // }

    // let answerTotal = 0;
    // for (const col of columns) {
    //     const answer = calcColumn(col);
    //     answerTotal += answer;
    // }
    //
    // console.log(`Grand total is ${answerTotal} of all columns' answers summed`);
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
