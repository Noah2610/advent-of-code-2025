import { getInput, dbg } from "../lib/util.ts";

async function main() {
    const content = await getInput();

    let totalJoltage = 0;

    for (const line of content.split("\n")) {
        totalJoltage += maxJoltage(line);
    }

    console.log(
        `Total joltage is ${totalJoltage} from all banks' max joltages`,
    );
}

function maxJoltage(bankS: string) {
    type Largest = { i: number; n: number };

    const bank = [...bankS]
        .map((c) => Number.parseInt(c))
        .filter(Number.isFinite);

    const totalDigits = 12;
    const nums: Largest[] = [];

    // console.log({ bank });

    for (let _ = 0; _ < totalDigits; _++) {
        let largest: Largest | null = null;
        const startAt = nums.length ? nums[nums.length - 1].i + 1 : 0;
        const endAt = Math.max(bank.length - (totalDigits - nums.length), 0);

        for (let i = startAt; i <= endAt; i++) {
            const n = bank[i];
            if (largest === null || n > largest.n) {
                largest = { i, n };
            }
        }

        // console.log({ _, largest, startAt });

        if (largest) {
            nums.push(largest);
        }
    }

    const numS = nums.map((l) => l.n).join("");
    return numS ? Number.parseInt(numS) : 0;
}

main();
