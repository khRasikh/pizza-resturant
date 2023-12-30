"use server";

import { IArticles, ICustomers, IOrder } from "../interface/general";
import clientPromise from "../lib/mongodb";

export async function getMenusFromMongoDB(tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    // const data = await db.collection("orders").find({}).sort({ metacritic: -1 }).toArray();
    const data = await db
      .collection(tableName)
      .find({}, { projection: { _id: 0 } })
      .sort({ CompNum: -1 })
      .toArray();

    const sortedData: any[] = data.sort((a, b) => {
      const compNumA = parseInt(a.CompNum, 10); // Convert CompNum to number
      const compNumB = parseInt(b.CompNum, 10);

      return compNumB - compNumA; // Sort in descending numeric order
    });
    const organizedData: IArticles[] = sortedData.map((i) => ({
      Type: i.Type,
      CompNum: i.CompNum,
      IhreNum: i.IhreNum,
      Name: i.Name,
      SinglPreis: i.SinglPreis,
      JumboPreis: i.JumboPreis,
      FamilyPreis: i.FamilyPreis,
      PartyPreis: i.PartyPreis,
      MWSt: i.MWSt,
      Rabatt: i.Rabatt,
    }));

    // return { status: true, headers, body, message: "OK" };
    return { status: true, data: organizedData, message: "OK" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, data: [], message: "Internal Server Error" };
  }
}

export async function getCustomersFromMongoDB(tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    // const data = await db.collection("orders").find({}).sort({ metacritic: -1 }).toArray();
    const data = await db
      .collection(tableName)
      .find({}, { projection: { _id: 0 } })
      .sort({ KNr: -1 })
      .toArray();

    const sortedData: any[] = data.sort((a, b) => {
      const KNrA = parseInt(a.KNr, 10); // Convert KNr to number
      const KNrB = parseInt(b.KNr, 10);

      return KNrB - KNrA; // Sort in descending numeric order
    });
    const organizedData: ICustomers[] = sortedData.map((i) => ({
      KNr: i.KNr,
      Name: i.Name,
      Tel: i.Tel,
      Str: i.Str,
      Ort: i.Ort,
      Seit: i.Seit,
      Mal: i.Mal,
      DM: i.DM,
      letzte: i.letzte,
      Rabatt: i.Rabatt,
      Fix: i.Fix,
      Bemerkung: i.Bemerkung,
    }));
    const headers = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung", "Seit", "Mal", "DM", "lezte", "Rabatt", "Fix\r"];
    return {
      status: true,
      headers,
      data: organizedData,
      message: "OK",
    };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, data: [], message: "Internal Server Error" };
  }
}

export async function getOrdersFromMongoDB(tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    // const data = await db.collection("orders").find({}).sort({ metacritic: -1 }).toArray();
    const data = await db
      .collection(tableName)
      .find({}, { projection: { _id: 0 } })
      .sort({ id: -1 })
      .toArray();

    const sortedData: any[] = data.sort((a, b) => {
      const KNrA = parseInt(a.order_date, 10); // Convert order_date to number
      const KNrB = parseInt(b.order_date, 10);

      return KNrB - KNrA; // Sort in descending numeric order
    });
    const organizedData: IOrder[] = sortedData.map((i) => ({
      id: i.id,
      customer_id: i.customer_id,
      name: i.name,
      price: i.price,
      count: i.count,
      extra: i.extra,
      discount: i.discount,
      total: i.total,
      order_date: i.order_date,
    }));

    return {
      status: true,
      data: organizedData,
      message: "OK",
    };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, data: [], message: "Internal Server Error" };
  }
}
