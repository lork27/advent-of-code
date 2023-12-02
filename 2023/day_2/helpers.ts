import { readFile } from "node:fs/promises";

export async function parseFile(fileName: string): Promise<string[]> {
  try {
    const contents = await readFile(fileName, { encoding: "utf8" });

    const arr = contents.split(/\r?\n/);
    // const arr = contents.split("\n\n").map((item) => item.split("\n"));

    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
}
