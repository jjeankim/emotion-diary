import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useEffect, useState } from "react";
import { DiaryItemProps } from "../type/type";
import useDiaryStore from "../store/diaryStore";

const getMonthlyData = (pivotDate: Date, data: DiaryItemProps[]) => {
  const biginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  );
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  return data.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return biginTime <= createdAt && createdAt <= endTime;
  });
};

const Home = () => {
  const { data, fetchData } = useDiaryStore();
  const [pivotDate, setPivotDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const monthlyData = getMonthlyData(pivotDate, data ?? []);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text="<" />}
        rightChild={<Button onClick={onIncreaseMonth} text=">" />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
