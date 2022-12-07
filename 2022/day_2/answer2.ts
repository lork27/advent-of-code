import { readFile } from "node:fs/promises";

type Points = {
  R: number;
  P: number;
  S: number;
};

const points: Points = {
  R: 1,
  P: 2,
  S: 3,
};

type EnemyHand = {
  A: { X: string; Y: string; Z: string };
  B: { X: string; Y: string; Z: string };
  C: { X: string; Y: string; Z: string };
};

const enemyHand = {
  A: { X: "S", Y: "R", Z: "P" },
  B: { X: "R", Y: "P", Z: "S" },
  C: { X: "P", Y: "S", Z: "R" },
};

type MyPlay = {
  X: number;
  Y: number;
  Z: number;
};

const myPlay = {
  X: 0,
  Y: 3,
  Z: 6,
};

async function main() {
  const input = await parseFile("./input.txt");
  let myPlays = 0;
  let myHands = 0;
  for (let i = 0; i < input.length; i++) {
    const enemy = input[i][0];
    const myStrat = input[i][2];

    myPlays += myPlay[myStrat as keyof MyPlay];
    myHands += calcMyHand(enemy, myStrat);
  }
  console.log(myPlays + myHands);
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

function calcMyHand(enemy: string, me: string) {
  const enemyPlay = enemyHand[enemy as keyof EnemyHand];
  const myPlay = enemyPlay[me as keyof MyPlay];
  return points[myPlay as keyof Points];
}

main();
