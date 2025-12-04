import fs from "node:fs/promises";

export async function getInput(name = "input") {
    const file = process.env.DEV ? `./${name}-dev.txt` : `./${name}.txt`;
    return (await fs.readFile(file, "utf8")).trim();
}

export async function getInputLines(name = "input"): Promise<string[]> {
    const content = await getInput();
    return content.split("\n");
}

export function dbg<T>(val: T, prefix = "dbg"): T {
    const e = new Error();
    const loc = e.stack?.split("\n")[2] ?? null;
    const msg = [`${prefix}>>`, loc && `[${loc}]:`, JSON.stringify(val)]
        .filter(Boolean)
        .join("\n");
    console.warn(msg);
    return val;
}
