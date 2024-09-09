import ChatCard from "@/components/ChatCard";
import React, { useEffect } from "react";
import { db } from "../../DB";
import { person } from "../../DB/schema";

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
