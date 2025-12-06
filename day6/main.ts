import { getInputLines } from "../lib/util.ts";

type Op = "+" | "*";

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
}

main();
