import { parseFile } from "./helpers";

async function main() {
  const input = await parseFile("./input");
  const answerA = answer1(input);
  console.log("answerA:\n ", answerA);

  const answerB = answer2(input);
  console.log("answerB:\n ", answerB);
}

function answer1(input: string[]) {
  const result = input
    .map((line) => {
      const numbers = line.replace(/[^0-9]/g, "");
      const number = numbers[0] + numbers[numbers.length - 1];
      return parseInt(number);
    })
    .reduce((acc, curr) => acc + curr);

  return result;
}

function answer2(input: string[]) {
  const result = input
    .map((line, i) => {
      const numbersLeft = line
        .replace(
          /one|two|three|four|five|six|seven|eight|nine/gi,
          function (matched) {
            return numbersMap[matched];
          }
        )
        .replace(/[^0-9]/g, "");
      const numbersRight = line
        .split("")
        .reduce((acc, char) => char + acc + "")
        .replace(
          /eno|owt|eerht|ruof|evif|xis|neves|thgie|eni/gi,
          function (matched) {
            return reverseNumbersMap[matched];
          }
        )
        .replace(/[^0-9]/g, "");

      const number = numbersLeft[0] + numbersRight[0];
      // console.log(
      //   `index: ${i} line: ${line} numbers: ${numbersLeft} reverse: ${numbersRight} number: ${number}`
      // );
      return parseInt(number);
    })
    .reduce((acc, curr) => acc + curr);

  return result;
}

const numbersMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const reverseNumbersMap = {
  eno: "1",
  owt: "2",
  eerht: "3",
  ruof: "4",
  evif: "5",
  xis: "6",
  neves: "7",
  thgie: "8",
  eni: "9",
};

main();
