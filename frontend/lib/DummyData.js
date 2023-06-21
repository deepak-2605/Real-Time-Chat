import fsPromises from 'fs/promises';
import path from 'path'

export async function getDummyData() {
  console.log(process.cwd());
  const filePath = path.join(process.cwd(), 'public/data/dummy-data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return objectData
}