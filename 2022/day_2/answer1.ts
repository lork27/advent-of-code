import { readFile } from "node:fs/promises";

type Points = {
  X: number;
  Y: number;
  Z: number;
};

const points: Points = {
  X: 1,
  Y: 2,
  Z: 3,
};

type Hands = {
  X: number;
  Y: number;
  Z: number;
  A: number;
  B: number;
  C: number;
};

const hands = {
  X: 0,
  Y: 1,
  Z: 2,
  A: 0,
  B: 1,
  C: 2,
};

async function main() {
  const input = await parseFile("./input.txt");
  let playScores = 0;
  let resultScores = 0;
  for (let i = 0; i < input.length; i++) {
    const enemy = input[i][0];
    const me = input[i][2];
    playScores += points[me as keyof Points];
    resultScores += calcGameScore(enemy, me);
  }

  console.log(playScores + resultScores);
}

async function parseFile(fileName: string): Promise<string[]> {
  try {
    const contents = await readFile(fileName, { encoding: "utf8" });
    const arr = contents.split("\n");

    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function calcGameScore(enemy: string, me: string) {
  const myPlay = hands[me as keyof Hands];
  const enemyPlay = hands[enemy as keyof Hands];
  if ((myPlay + 1) % 3 === enemyPlay) return 0;
  if (myPlay === enemyPlay) return 3;
  return 6;
}

main();
