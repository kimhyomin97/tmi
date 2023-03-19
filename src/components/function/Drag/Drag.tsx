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
  const [secondData, setSecondData] = useState<Person[]>([]);

  useEffect(() => {
    // data init
    setData(tempData);
  }, []);

  const handleShowData = () => {
    console.log(data);
    console.log(secondData);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData("text/plain", target.id);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    event.preventDefault();
    const targetData = event.dataTransfer.getData("text/plain");
    const sourceIndex = data.findIndex((div) => div.id === targetIndex);
    const newData = [...data];
    // const tempData = [...secondData];
    const [removed] = newData.splice(sourceIndex, 1);
    newData.splice(targetIndex, 0, removed);
    // setData(newData);
    setData([...newData, newData[sourceIndex]]);
    // setSecondData([...tempData, newData[sourceIndex]]);
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
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDragDrop(event, index)}
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
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDragDrop(event, index)}
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
