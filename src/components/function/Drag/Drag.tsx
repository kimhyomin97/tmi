import React, { useEffect, useState } from "react";

interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
}

const Drag = () => {
  const tempData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      age: 28,
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      age: 35,
    },
    {
      id: 4,
      name: "Mary Johnson",
      email: "mary.johnson@example.com",
      age: 42,
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom.brown@example.com",
      age: 27,
    },
    {
      id: 6,
      name: "Sara Lee",
      email: "sara.lee@example.com",
      age: 31,
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      age: 39,
    },
    {
      id: 8,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      age: 26,
    },
    {
      id: 9,
      name: "Mike Smith",
      email: "mike.smith@example.com",
      age: 33,
    },
    {
      id: 10,
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      age: 29,
    },
  ];
  const [data, setData] = useState<Person[]>([]);
  useEffect(() => {
    // data init
    setData(tempData);
  }, []);

  return (
    <>
      <div className="drag-container">
        {data?.map((item, index) => {
          return (
            <>
              <div key={index} className="">
                {item.name}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Drag;
