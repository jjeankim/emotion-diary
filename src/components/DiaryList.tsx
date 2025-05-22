import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useState } from "react";
import { DiaryListProps } from "../type/type";

const DiaryList = ({ data }: DiaryListProps) => {
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      const timeA = new Date(a.createdDate).getTime();
      const timeB = new Date(b.createdDate).getTime();

      if (sortType === "oldest") {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    });
  };

  const sortedData = getSortedData();
  const nav = useNavigate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새로운 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
