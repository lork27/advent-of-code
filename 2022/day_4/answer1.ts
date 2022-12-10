import { readFile } from "node:fs/promises";

async function main() {
  const input = await parseFile("./input.txt");

  console.log("answer 1:");
  console.log(
    input.filter(([left, right]) => fullyOverlaps(left, right)).length
  );

  console.log("answer 2:");
  console.log(
    input.filter(([left, right]) => partiallyOverlaps(left, right)).length
  );
}

async function parseFile(fileName: string) {
  const contents = await readFile(fileName, { encoding: "utf8" });
  const arr: string[][] = contents.split("\n").map((line) => line.split(","));
  return arr;
}

main();

function fullyOverlaps(s1: string, s2: string) {
  const [startA, endA] = stringToNumberArray(s1);
  const [startB, endB] = stringToNumberArray(s2);

  return (
    (startA >= startB && endA <= endB) || (startB >= startA && endB <= endA)
  );
}

function partiallyOverlaps(s1: string, s2: string) {
  const [startA, endA] = stringToNumberArray(s1);
  const [startB, endB] = stringToNumberArray(s2);

  return startA <= endB && startB <= endA;
}

function stringToNumberArray(input: string) {
  const [left, right] = input.split("-");
  return [parseInt(left), parseInt(right)];
}
