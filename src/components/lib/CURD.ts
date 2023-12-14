"use server";

import { Collection, Db } from "mongodb";
import clientPromise from "./mongodb";

export async function fetchData(table: string) {
  try {
    const client: any = await clientPromise;
    const db = client.db("resturant");

    const result = await db.collection(table).find({}).sort({ metacritic: -1 }).toArray();
    return { data: result, status: true, statusCode: 200 };
  } catch (e) {
    console.error(e);
    return { data: [], status: false, statusCode: 500 };
  }
}

export async function insertOne(formData: string, table: string) {
  try {
    const client: any = await clientPromise;
    const db = client.db("resturant");

    const result = await db.collection(table).insertOne(JSON.parse(formData));
    return { data: result, status: true, statusCode: 200 };
  } catch (e) {
    console.error(e);
    return { data: [], status: false, statusCode: 500 };
  }
}

export async function insertMany(formData: string, table: string) {
    try {
      const client: any = await clientPromise; // Assuming clientPromise resolves to a MongoClient
      const db: Db = client.db("restaurant");
  
      const collection: Collection<any> = db.collection(table);
      const parsedFormData = JSON.parse(formData);
  
      if (Array.isArray(parsedFormData)) {
        const result = await collection.insertMany(parsedFormData);
        return { data: result, status: true, statusCode: 200 };
      } else {
        throw new Error('formData should be an array of documents for bulk insertion.');
      }
    } catch (e) {
      console.error(e);
      return { data: [], status: false, statusCode: 500 };
    }
  }

export async function deleteOne(id: string, table: string) {
  try {
    const client: any = await clientPromise;
    const db = client.db("resturant");

    const result = await db.collection(table).deleteOne({ id: id });
    return { data: result, status: true, statusCode: 200 };
  } catch (e) {
    console.error(e);
    return { data: [], status: false, statusCode: 500 };
  }
}
