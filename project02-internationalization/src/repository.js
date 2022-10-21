import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  const { pathname: databaseFile } = new URL(
    "../database.json",
    import.meta.url
  );
  const content = JSON.parse(await readFile(databaseFile));
  content.push(data);
  await writeFile(databaseFile, JSON.stringify(content));
};
