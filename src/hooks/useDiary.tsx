import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryItemProps } from "../type/type";
import useDiaryStore from "../store/diaryStore";

const useDiary = (id?: string): DiaryItemProps | undefined => {
  const nav = useNavigate();
  const { data } = useDiaryStore();
  const [currentDiaryItem, setCurrentDiaryItem] = useState<
    DiaryItemProps | undefined
  >();

  useEffect(() => {
    if (!data) return;

    const currentDiaryItem = data?.find((item) => item._id === id);
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurrentDiaryItem(currentDiaryItem);
  }, [id, data, nav]);

  return currentDiaryItem;
};

export default useDiary;
