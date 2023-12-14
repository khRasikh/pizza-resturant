"use server";

import { promises as fs } from "fs";

export default async function getData() {
  const file = await fs.readFile(process.cwd() + "/article.json", "utf8");
  const data1 = JSON.parse(file);
  console.log(data1);
  return { data: data1 };
}

export async function addData() {
  const newRecord = { title: 'My Titl sse 4', content: 'Lorem Ipsum 4' }
  try {
    const filePath = process.cwd() + '/article.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);

    // Add the new record
    data.push(newRecord);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    console.log('Success: Record added successfully');
    return { message: 'Record added successfully', newData: newRecord };
  } catch (error) {
    console.error('Failure:', error);
    return { message: 'Failed to add record', error };
  }
}


export async function deleteData(id: number) {
  try {
    const filePath = process.cwd() + '/article.json';
    const file = await fs.readFile(filePath, 'utf8');
    let data = JSON.parse(file);

    // Find the index of the record with the provided ID
    const indexToDelete = data.findIndex((record: { id: number }) => record.id === id);

    if (indexToDelete !== -1) {
      // Remove the record from the data array
      data = data.filter((_: any, index: any) => index !== indexToDelete);

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      console.log('Success: Record deleted successfully');
      return { message: 'Record deleted successfully', deletedId: id };
    } else {
      console.error('Failure: Record not found');
      return { message: 'Record not found', error: 'Record not found' };
    }
  } catch (error) {
    console.error('Failure:', error);
    return { message: 'Failed to delete record', error };
  }
}

