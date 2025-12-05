import fs from "node:fs/promises";

export async function getInput(name = "input") {
    const file = process.env.DEV ? `./${name}-dev.txt` : `./${name}.txt`;
    return (await fs.readFile(file, "utf8")).trim();
}

export async function getInputLines(name = "input"): Promise<string[]> {
    const content = await getInput();
    return content.split("\n");
}

// export function dbg<T>(val: T, opts: { prefix: string }): T;
export function dbg<T>(val: T, ...opts: any[]): T {
    const prefix =
        (opts[opts.length - 1] &&
            typeof opts[opts.length - 1] === "object" &&
            "prefix" in opts[opts.length - 1] &&
            opts[opts.length - 1].prefix) ??
        "dbg";
    const e = new Error();
    const fmt = (v: any) => JSON.stringify(v);
    const loc = e.stack?.split("\n")[2] ?? null;
    const msg = [
        `${prefix}>>`,
        loc && `[${loc}]:`,
        fmt(val),
        ...(Array.isArray(opts) ? opts.map(fmt) : []),
    ]
        .filter(Boolean)
        .join("\n");
    console.warn(msg);
    return val;
}
