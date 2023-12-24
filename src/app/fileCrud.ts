"use server";

import { ICustomers } from "@/components/interface/general";
import { promises as fs } from "fs";

export async function getMenusFromFile() {
  const file = await fs.readFile(process.cwd() + "/article.json", "utf8");
  const data = JSON.parse(file);
  const sortedData = data.sort((a: { CompNum: number }, b: { CompNum: number }) => b.CompNum - a.CompNum);
  return { data: sortedData };
}

export async function readDataFromTextFile(table: string): Promise<any> {
  try {
    const data = await fs.readFile(process.cwd() + `/${table}.txt`, "utf8");
    //split into table
    const rawData = data.split("/n");

    // Splitting data into rows
    const rows = rawData[0].split("\n").filter(Boolean);

    // Extracting headers and splitting them into an array
    const headers = rows[0].split("\t");

    const body = rows.slice(1).map((row) => {
      const rowData = row.split("\t");
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = rowData[index];
      });
      return obj;
    });

    return { status: true, headers, body, message: "Record deleted successfully" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, message: "Failed to delete record" };
  }
}

export async function addDataToTextFile<T extends ICustomers>(newEntry: T, table: string) {
  try {
    const { body, headers } = await readDataFromTextFile("customers");

    headers.join("\t");

    // Check if KNr already exists
    const existingKTel = body.filter((record: { Tel: string }) => record.Tel === newEntry["Tel"]);
    if (existingKTel.length > 0) {
      return { status: false, statusCode: 422, message: "Record already existed" };
    }

    // add new KNr if not existed
    const existingKNrs = body.map((record: { KNr: any }) => record.KNr);
    const newKNr = parseInt(existingKNrs[existingKNrs.length - 1]) + 1 || 1;
    newEntry["KNr"] = newKNr;

    console.log("test", newKNr);
    const values = headers.map((header: keyof T) => newEntry[header] || "").join("\t");
    const newData = `\n${values}`;

    await fs.appendFile(process.cwd() + `/${table}.txt`, newData, "latin1");

    return { status: true, statusCode: 200, message: "Record added successfully" };
  } catch (err) {
    console.error("Error adding data:", err);
    return { status: false, message: "Failed to add record", err };
  }
}

export async function deleteDataFromTextFile(KNr: string, table: string): Promise<{ status: boolean; message: string }> {
  try {
    const { body, headers } = await readDataFromTextFile("customers");

    const indexToDelete = body.findIndex(
      (record: { KNr: { toString: () => string } }) => record.KNr.toString().toLowerCase() === KNr.toString().toLowerCase()
    );

    if (indexToDelete === -1) {
      return { status: false, message: "Record not found" };
    }

    console.log(indexToDelete);
    body.splice(indexToDelete, 1);

    const newData = [
      headers.join("\t"),
      ...body.map((record: { [x: string]: any }) =>
        headers.map((header: string) => record[header as keyof ICustomers] || "").join("\t")
      ),
    ].join("\n");

    await fs.writeFile(process.cwd() + `/${table}.txt`, newData, "utf8");

    return { status: true, message: "Record deleted successfully" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, message: "Failed to delete record" };
  }
}

export async function getCustomersFromFile() {
  const file = await fs.readFile(process.cwd() + "/customers.json", "utf8");
  const data = JSON.parse(file);
  const sortedData = data.sort((a: { KNr: number }, b: { KNr: number }) => b.KNr - a.KNr);
  return { data: sortedData };
}

export async function addData<T>(newRecord: T, table: string) {
  try {
    const filePath = process.cwd() + `/${table}.json`;
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    // Add the new record
    data.push(newRecord);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    console.log("Success: Record added successfully");
    return { status: true, statusCode: 200, message: "Record added successfully" };
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to add record", error };
  }
}

export async function deleteData(id: number, tableName: string, fieldName: string) {
  console.log(id, tableName, fieldName);
  try {
    const filePath = process.cwd() + `/${tableName}.json`;
    const file = await fs.readFile(filePath, "utf8");
    let data = JSON.parse(file);

    // Find the index of the record with the provided ID and field name
    const indexToDelete = data.findIndex((record: any) => {
      return record[fieldName] === id || record[fieldName].toString() === id.toString();
    });

    if (indexToDelete !== -1) {
      // Remove the record from the data array using splice
      data.splice(indexToDelete, 1);

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      console.log("Success: Record deleted successfully");
      return { status: true, statusCode: 200, message: "Record deleted successfully", deletedId: id };
    } else {
      console.error("Failure: Record not found");
      return { status: false, statusCode: 500, message: "Record not found" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, statusCode: 500, message: "Record not found" };
  }
}
