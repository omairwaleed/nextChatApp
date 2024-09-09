import ChatCard from "@/components/ChatCard";
import React, { useEffect } from "react";
import { db } from "../../DB";
import { person } from "../../DB/schema";
// import sqlite3Worker1Promiser from "@sqlite.org/sqlite-wasm";
const log = console.log;
const error = console.error;

const initializeSQLite = async () => {
  try {
    log("Loading and initializing SQLite3 module...");

    const promiser = await new Promise((resolve) => {
      const _promiser = sqlite3Worker1Promiser({
        onready: () => resolve(_promiser),
      });
    });

    log("Done initializing. Running demo...");

    const configResponse = await promiser("config-get", {});
    log("Running SQLite3 version", configResponse.result.version.libVersion);

    const openResponse = await promiser("open", {
      filename: "file:mydb.sqlite3?vfs=opfs",
    });
    const { dbId } = openResponse;
    log(
      "OPFS is available, created persisted database at",
      openResponse.result.filename.replace(/^file:(.*?)\?vfs=opfs$/, "$1")
    );
    // Your SQLite code here.
  } catch (err) {
    if (!(err instanceof Error)) {
      err = new Error(err.result.message);
    }
    error(err.name, err.message);
  }
};

const Home = () => {
  const fetchData = async () => {
    console.time("myFunctionTimer");
    const data = await db.select().from(person);
    // await db
    //   .insert(person)
    //   .values({ id: 2, userName: "Omair", userCountry: "Egypt" });
    console.timeEnd("myFunctionTimer");
    console.log("data", data);
  };
  fetchData();

  return (
    <div className="h-full bg-red-700 grid grid-cols-12 grid-rows-12">
      <div className="row-span-12 col-span-3 bg-white px-4 py-4 overflow-y-scroll scrollbar-none">
        <p className="text-black font-bold text-xl">Inbox</p>
        <ChatCard />
        <ChatCard /> <ChatCard />
        <ChatCard /> <ChatCard /> <ChatCard /> <ChatCard /> <ChatCard />{" "}
        <ChatCard /> <ChatCard /> <ChatCard /> <ChatCard /> <ChatCard />
      </div>
      <div className="row-span-12 col-span-9 bg-gray-400 px-4 py-4">
        Inner body
      </div>
    </div>
  );
};

export default Home;
