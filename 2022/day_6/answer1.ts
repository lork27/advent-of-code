import { readFile } from "node:fs/promises";

async function main() {
  const input = await parseFile("./input.txt");
  const part1 = answer1(input);
  console.log(part1);
  const part2 = answer2(input);
  console.log(part2);
}

async function parseFile(fileName: string) {
  const contents = await readFile(fileName, { encoding: "utf8" });
  return contents;
}

function answer1(line: string) {
  for (let i = 0; i < line.length; i++) {
    const chunk = line.slice(i, i + 4);
    const chunkComparison = [...new Set(chunk)];
    if (chunk.length === chunkComparison.length) {
      return i + chunk.length;
    }
  }
}

function answer2(line: string) {
  for (let i = 0; i < line.length; i++) {
    const chunk = line.slice(i, i + 14);
    const chunkComparison = [...new Set(chunk)];
    if (chunk.length === chunkComparison.length) {
      console.log(chunk);
      console.log(chunkComparison);
      return i + chunk.length;
    }
  }
}

main();
