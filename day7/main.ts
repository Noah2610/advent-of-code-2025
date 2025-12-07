import { getInputLines } from "../lib/util.ts";

type Grid = string[][];
type Beam = { x: number; };
type Pos = { x: number; y: number; };

async function main() {
  const grid: Grid = [];
  const beams: Beam[] = [];

  const lines = await getInputLines();

  for (const line of lines) {
    grid.push([...line]);
  }

  const addBeam = (x: number) => {
    for (const beam of beams) {
      if (beam.x === x) return;
    }
    beams.push({ x });
  };

  const rmBeam = (x: number) => {
    for (let i = beams.length - 1; i >= 0; i--) {
      const beam = beams[i];
      if (beam.x === x) {
        beams.splice(i, 1);
      }
    }
  };

  let totalSplits = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      
      if (c === "S") {
        beams.push({ x });
        continue;
      }

      for (const beam of beams) {
        if (x === beam.x) {
          switch (c) {
            case "|": {
              // beam - do nothing
              break;
            }
            case ".": {
              console.log(beams.length);
              row[x] = "|";
              break;
            }
            case "^": {
              totalSplits += 1;
              addBeam(x-1);
              addBeam(x+1);
              rmBeam(x);
              row[x-1] = "|";
              row[x+1] = "|";
              break;
            }
          }
        }
      }
    }
  }

  console.log(beams.length, beams);
  displayGrid(grid);

  console.log(`The beam split ${totalSplits} times`);
}

function displayGrid(grid: Grid) {
  const lines: string[] = [];

  for (const row of grid) {
    let out = "";
    for (const c of row) {
      out += c;
    }
    lines.push(out);
  }

  console.log(lines.join("\n"));
}

main();
