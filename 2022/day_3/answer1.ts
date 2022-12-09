import { readFile } from "node:fs/promises";

type Sack = {
  left: string[];
  right: string[];
};

async function main() {
  const input = await parseFile("./input.txt");

  let sum = 0;

  input.forEach((sack) => {
    const repeat = [
      ...new Set(sack.left.filter((x) => sack.right.includes(x))),
    ][0];
    sum +=
      repeat.codePointAt(0)! >= 97
        ? repeat.codePointAt(0)! - 96
        : repeat.codePointAt(0)! - 38;
  });

  console.log(sum);
}

async function parseFile(fileName: string): Promise<Sack[]> {
  try {
    const contents = await readFile(fileName, { encoding: "utf8" });
    const arr: string[] = contents.split("\n");
    const sacks = arr.map((line: string) => {
      return {
        left: line.slice(0, line.length / 2).split(""),
        right: line.slice(line.length / 2, line.length).split(""),
      };
    });

    return sacks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

main();
