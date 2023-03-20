import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Drag.scss";

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
      name: "AAAA",
      email: "john.doe@example.com",
      age: 30,
    },
    {
      id: 2,
      name: "BBBB",
      email: "jane.doe@example.com",
      age: 28,
    },
    {
      id: 3,
      name: "CCCC",
      email: "bob.smith@example.com",
      age: 35,
    },
    {
      id: 4,
      name: "DDDD",
      email: "mary.johnson@example.com",
      age: 42,
    },
    {
      id: 5,
      name: "EEEE",
      email: "tom.brown@example.com",
      age: 27,
    },
    {
      id: 6,
      name: "FFFF",
      email: "sara.lee@example.com",
      age: 31,
    },
    {
      id: 7,
      name: "GGGG",
      email: "david.wilson@example.com",
      age: 39,
    },
    {
      id: 8,
      name: "HHHH",
      email: "emily.davis@example.com",
      age: 26,
    },
    {
      id: 9,
      name: "IIII",
      email: "mike.smith@example.com",
      age: 33,
    },
    {
      id: 10,
      name: "JJJJ",
      email: "jessica.brown@example.com",
      age: 29,
    },
  ];
  const [data, setData] = useState<Person[]>([]);
  const [secondData, setSecondData] = useState<Person[]>([]);
  const [endIndex, setEndIndex] = useState<number>();
  const [startIndex, setStartIndex] = useState<number>();

  useEffect(() => {
    // data init
    setData(tempData);
  }, []);

  const handleShowData = () => {
    console.log(data);
    console.log(secondData);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setStartIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setEndIndex(index);
  };

  const handleDragEnd = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    if (startIndex !== undefined && endIndex !== undefined) {
      const list = [...data];
      const target = list.splice(startIndex, 1)[0];
      list.splice(endIndex, 0, target);
      setData(list);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleShowData}>
        데이터 출력
      </Button>
      <div className="drag-container">
        <div className="drag-box">
          {data?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="drag-content"
                  draggable={true}
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={(event) => handleDragOver(event, index)}
                  onDragEnd={(event) => handleDragEnd(event, index)}
                >
                  {item?.name}
                </div>
              </>
            );
          })}
        </div>
        <div className="drag-box">
          {secondData?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="drag-content"
                  draggable={true}
                  // onDragStart={handleDragStart}
                  // onDragOver={handleDragOver}
                >
                  {item.name}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Drag;
