"use server";

import { Collection, ObjectId } from "mongodb";
import { IArticles, ICustomers, IOrder } from "../interface/general";
import clientPromise from "../lib/mongodb";

export async function getMenusFromMongoDB(tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    const data = await db
      .collection(tableName)
      .find({}, { projection: { _id: 0 } })
      .sort({ CompNum: -1 })
      .toArray();

    const sortedData: any[] = [...data].sort((a, b) => {
      const compNumA = parseInt(a.CompNum, 10);
      const compNumB = parseInt(b.CompNum, 10);
      return compNumA - compNumB;
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

    return { status: true, data: organizedData, message: "OK" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, data: [], message: "Internal Server Error" };
  }
}

// fetch customers without pagination
// export async function getCustomersFromMongoDB(tableName: string) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("resturant");

//     const data = await db
//       .collection(tableName)
//       .find({}, { projection: { _id: 0 } })
//       .sort({ KNr: -1 })
//       .toArray();

//     const sortedData: any[] = [...data].sort((a, b) => {
//       const KNrA = parseInt(a.KNr, 10); // Convert KNr to number
//       const KNrB = parseInt(b.KNr, 10);

//       return KNrB - KNrA; // Sort in descending numeric order
//     });
//     const organizedData: ICustomers[] = sortedData.map((i) => ({
//       KNr: i.KNr,
//       Name: i.Name,
//       Tel: i.Tel,
//       Str: i.Str,
//       Ort: i.Ort,
//       Seit: i.Seit,
//       Mal: i.Mal,
//       DM: i.DM,
//       letzte: i.letzte,
//       Rabatt: i.Rabatt,
//       Fix: i.Fix,
//       Bemerkung: i.Bemerkung,
//     }));
//     const headers = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung", "Seit", "Mal", "DM", "lezte", "Rabatt", "Fix\r"];

//     return {
//       status: true,
//       headers,
//       data: organizedData,
//       message: "OK",
//     };
//   } catch (err) {
//     console.error("Error deleting data:", err);
//     return { status: false, data: [], message: "Internal Server Error" };
//   }
// }

// fetch customers with server side pagination
export async function getCustomersFromMongoDB(
  tableName: string,
  searchSSR: string = "",
  pageNumber: number = 1,
  pageSize: number = 10
) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    let query: any = {};

    if (searchSSR) {
      query = { KNr: searchSSR };
    }
    const skipCount = (pageNumber - 1) * pageSize;

    const data = await db
      .collection(tableName)
      .find(query, { projection: { _id: 0 } })
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(pageSize)
      .toArray();

    const organizedData: ICustomers[] = data.map((i) => ({
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
    const total = await db.collection(tableName).countDocuments();
    return {
      status: true,
      headers,
      data: { items: organizedData, pageNumber, pageSize, total },
      message: "OK",
    };
  } catch (err) {
    console.error("Error retrieving data:", err);
    return {
      status: false,
      data: { items: [], pageNumber: 1, pageSize: 1, total: 0 },
      message: "Internal Server Error",
    };
  }
}

export async function getOrdersFromMongoDB(tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    const data = await db
      .collection(tableName)
      .find({}, { projection: { _id: 0 } })
      .sort({ id: -1 })
      .toArray();

    const sortedData: any[] = [...data].sort((a, b) => {
      const KNrA = parseInt(a.order_date, 10); // Convert order_date to number
      const KNrB = parseInt(b.order_date, 10);

      return KNrB - KNrA; // Sort in descending numeric order
    });
    const organizedData: IOrder[] = sortedData.map((i) => ({
      id: i.id,
      customer_id: i.customer_id,
      customer_name: i.customer_name,
      category: i.category,
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

export async function getOrdersByIDFromMongoDB(tableName: string, customer_id: number) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");

    // const data = await db.collection("orders").find({}).sort({ metacritic: -1 }).toArray();
    const data = await db
      .collection(tableName)
      .find({ customer_id: customer_id.toString() }, { projection: { _id: 0 } })
      .sort({ id: -1 })
      .toArray();

    const sortedData: any[] = [...data].sort((a, b) => {
      const KNrA = parseInt(a.order_date, 10); // Convert order_date to number
      const KNrB = parseInt(b.order_date, 10);

      return KNrB - KNrA; // Sort in descending numeric order
    });
    const organizedData: IOrder[] = sortedData.map((i) => ({
      id: i.id,
      customer_id: i.customer_id,
      customer_name: i.customer_name,
      category: i.category,
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

export async function addDataToMongoDB(newData: any, tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");
    const collection = db.collection(tableName);

    if (tableName === "customers") {
      const totalDocuments = await collection.countDocuments({});
      newData.KNr = (totalDocuments + 1).toString();
      newData = [newData];
    } else if (tableName === "menus") {
      newData = [newData];
    }

    //remove existing records
    const deleteLastOrder = await collection.deleteMany({
      customer_id: newData[0].customer_id.toString(),
    });
    if (deleteLastOrder.acknowledged) {
      const result = await collection.insertMany(newData);

      // create new record
      const getLastResult = await db
        .collection("customers")
        .findOne({ _id: result.insertedIds["0"] }, { projection: { _id: 0 } });
      if (result.insertedCount >= 1) {
        console.log("Success: Record added successfully", getLastResult);
        return { status: true, statusCode: 200, data: getLastResult, message: "Record added successfully" };
      } else {
        console.log("Failed to add record");
        return { status: false, message: "Failed to add data" };
      }
    } else {
      return { status: false, message: "Failed to add record" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to add record", error };
  }
}

export async function updateDataToMongoDB(KNr: string, updatedData: any, tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");
    const collection = db.collection("customers");

    const result = await collection.findOneAndUpdate(
      {
        KNr: KNr.toString().trim(),
      },
      {
        $set: updatedData,
      },
      { returnDocument: "after" }
    );

    if (result) {
      console.log("Success: Record updated successfully");
      return { status: true, statusCode: 200, message: "Record updated successfully" };
    } else {
      console.log("No matching record found for update");
      return { status: false, message: "No matching record found for update" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to update record", error };
  }
}

export async function deleteMenuFromMongoDB(id: string, tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");
    const collection: Collection<Document> = db.collection(tableName);

    const result = await collection.deleteOne({
      CompNum: `${id}` || id,
    });

    if (result.deletedCount === 1) {
      console.log("Success: Record deleted successfully");
      return { status: true, statusCode: 200, message: "Record deleted successfully" };
    } else {
      console.log("Failed to delete record");
      return { status: false, message: "Failed to delete record" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to delete record", error };
  }
}
export async function deleteOrderFromMongoDB(id: string, tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");
    const collection: Collection<Document> = db.collection(tableName);

    const result = await collection.deleteOne({
      id: id.toString(),
    });

    if (result.deletedCount === 1) {
      console.log("Success: Record deleted successfully");
      return { status: true, statusCode: 200, message: "Record deleted successfully" };
    } else {
      console.log("Failed to delete record");
      return { status: false, message: "Failed to delete record" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to delete record", error };
  }
}

export async function deleteCustomerFromMongoDB(id: string, tableName: string) {
  try {
    const client = await clientPromise;
    const db = client.db("resturant");
    const collection: Collection<Document> = db.collection(tableName);

    const result = await collection.deleteOne({
      KNr: `${id}` || id,
    });
    console.log(result);
    if (result.deletedCount === 1) {
      console.log("Success: Record deleted successfully");
      return { status: true, statusCode: 200, message: "Record deleted successfully" };
    } else {
      console.log("Failed to delete record");
      return { status: false, message: "Failed to delete record" };
    }
  } catch (error) {
    console.error("Failure:", error);
    return { status: false, message: "Failed to delete record", error };
  }
}
