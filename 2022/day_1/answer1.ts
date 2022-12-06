import { readFile } from "node:fs/promises";

async function main() {
  const input = await parseFile("./input0.txt");
  const answer1 = input
    .map((list) =>
      list.reduce((acc: number, curr: string) => acc + parseInt(curr), 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3);

  const answer2 = answer1.reduce((acc: number, curr: number) => acc + curr);

  console.log("answer 1: ", answer1[0]);
  console.log("answer 2: ", answer2);
}

async function parseFile(fileName: string): Promise<string[][]> {
  try {
    const contents = await readFile(fileName, { encoding: "utf8" });
    // const arr = contents.split(/\r?\n/);
    const arr = contents.split("\n\n").map((item) => item.split("\n"));

    return arr;
  } catch (error) {
    console.log(error);
    return [[]];
  }
}

main();
