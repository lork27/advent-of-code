import { parseFile } from "./helpers";

async function main() {
  const input = await parseFile("./input");

  const gamesAndSets = input.map((i) => {
    return { [i.split(":")[0]]: i.split(":")[1].split(";") };
  });
  //   console.log("games: ", gamesAndSets);
  const answerA = answer1(gamesAndSets);
  console.log("first star: ", answerA);

  const answerB = answer2(gamesAndSets);
  console.log("second star: ", answerB);
}

function answer1(input: { [key: string]: string[] }[]) {
  const res = input
    .map((gameSet) => {
      const game = Object.keys(gameSet)[0];
      const set = Object.values(gameSet);

      let setIsPossible = true;

      set.forEach((balls) => {
        balls.forEach((b) => {
          const line = b.split(",");
          return line.forEach((numAndColor) => {
            const [num, color] = numAndColor.trim().split(" ");
            console.log(
              `num: ${num}, color: ${color}, num in bag: ${bagOne[color]}`
            );
            console.log("this game is: ", bagOne[color] > num);
            if (bagOne[color] < num) {
              setIsPossible = false;
            }
          });
        });
      });
      //   console.log(`\ngame: ${game} and set: ${setIsPossible}\n\n\n`);
      return setIsPossible ? parseInt(game.split(" ")[1]) : 0;
    })
    .reduce((acc, curr) => curr + acc);
  //   console.log(res);

  return res;
}

function answer2(input: { [key: string]: string[] }[]) {
  let sum = 0;
  const res = input.map((gameSet) => {
    const game = Object.keys(gameSet)[0];
    const set = Object.values(gameSet);
    const tmpBag = { red: 0, green: 0, blue: 0 };
    set.forEach((balls) => {
      balls.forEach((b) => {
        const line = b.split(",");
        line.forEach((numAndColor) => {
          const [num, color] = numAndColor.trim().split(" ");
          const number = parseInt(num);

          console.log(
            `num: ${num}, color: ${color}, num in bag: ${bagOne[color]}`
          );
          if (tmpBag[color] <= number) {
            tmpBag[color] = number;
          }
        });
      });
      console.log("tmp bag", tmpBag);
      console.log(Object.values(tmpBag).reduce((acc, curr) => curr * acc));
      sum += Object.values(tmpBag).reduce((acc, curr) => curr * acc);
    });
  });
  return sum;
}

const bagOne = {
  red: 12,
  green: 13,
  blue: 14,
};

main();
