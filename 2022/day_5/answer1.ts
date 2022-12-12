import { readFile } from "node:fs/promises";

type instruction = {
  mv: number;
  fr: number;
  to: number;
};

async function main() {
  const [crates, instructions] = await parseFile("./input.txt");

  const initialState = parseCrates(crates);
  const parsedInstructions = parseInstructions(instructions);

  // const part1 = answer1(initialState, parsedInstructions);
  // console.log(part1);

  const part2 = answer2(initialState, parsedInstructions);
  console.log(part2);
}

async function parseFile(fileName: string) {
  const contents = await readFile(fileName, { encoding: "utf8" });
  return contents.split("\n\n");
}

function parseCrates(crates: string) {
  const cratesArr = crates.split("\n");
  const numCrates = parseInt(cratesArr.pop()?.slice(-2)!);
  const cratesInput = cratesArr.map((line) => {
    const chars = line
      .split("")
      .filter((_, i) => !(i !== 0 && (i + 1) % 4 === 0));
    const buffer: string[] = [];
    for (let index = 2; index < chars.length; index += 3) {
      if (chars[index] === "]") {
        buffer.push(chars[index - 1]);
      } else {
        buffer.push("-");
      }
    }
    return buffer;
  });

  let finalState: string[][] = [...Array(numCrates).keys()].map(() => []);

  cratesInput.forEach((line, i) => {
    line.forEach((row, j) => {
      if (row !== "-") {
        finalState[j]?.push(row);
      }
    });
  });

  return finalState;
}
function parseInstructions(input: string) {
  const lines = input.split("\n");
  const instructions = lines.map((line) => {
    return {
      mv: parseInt(line.split(" ")[1]),
      fr: parseInt(line.split(" ")[3]),
      to: parseInt(line.split(" ")[5]),
    };
  });
  return instructions;
}
function answer1(initialState: string[][], instructions: instruction[]) {
  for (const instruction of instructions) {
    const from = initialState[instruction.fr - 1];
    const to = initialState[instruction.to - 1];
    for (let index = 0; index < instruction.mv; index++) {
      const popped = from.shift();
      to.unshift(popped!);
    }
  }
  return initialState.map((crate) => crate[0]).join("");
}

function answer2(initialState: string[][], instructions: instruction[]) {
  for (const instruction of instructions) {
    const from = initialState[instruction.fr - 1];
    console.log(from);
    initialState[instruction.to - 1];
    const popped = from.splice(0, instruction.mv);
    console.log(from);
    initialState[instruction.to - 1] = popped.concat(
      initialState[instruction.to - 1]
    );
  }
  return initialState.map((crate) => crate[0]).join("");
}

main();
