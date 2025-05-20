import { useContext, useEffect, useState } from "react";
import { DiaryData, DiaryStateContext } from "../App";
import { useNavigate} from "react-router-dom";

const useDiary = (id:number) => {
  
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [currentDiaryItem, setCurrentDiaryItem] = useState<DiaryData | undefined>();
  useEffect(() => {
    const currentDiaryItem = data?.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurrentDiaryItem(currentDiaryItem);
  }, [id, data,nav]);

  return currentDiaryItem;
};

export default useDiary