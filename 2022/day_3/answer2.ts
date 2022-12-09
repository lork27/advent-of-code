import { readFile } from "node:fs/promises";

async function main() {
  const input = await parseFile("./input.txt");

  let total = 0;
  input.forEach((group, i) => {
    const repeats: any = group.split("").reduce((acc: any, val: any) => {
      return { ...acc, [val]: (acc[val] ?? 0) + 1 };
    });
    const badge = Object.keys(repeats).find((key) => repeats[key] === 3)!;
    const valueBadge =
      badge === undefined ? toValue(repeats[0]) : toValue(badge);
    total += valueBadge;
  });
  console.log(total);
}

async function parseFile(fileName: string): Promise<string[]> {
  try {
    const contents = await readFile(fileName, { encoding: "utf8" });
    const arr: string[] = contents.split("\n");

    const groups = arr
      .map((line) => {
        return [...new Set(line)].toString();
      })
      .reduce((acc: any, curr: any, i: any): any => {
        if (i % 3 !== 0) {
          return acc + curr;
        } else {
          return acc + "\n" + curr;
        }
      });
    return groups.replaceAll(",", "").split("\n");
    // return groups;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function toValue(c: string) {
  if (c.charCodeAt(0) >= 97) {
    return c.charCodeAt(0) - 96;
  } else {
    return c.charCodeAt(0) - 38;
  }
}

main();
