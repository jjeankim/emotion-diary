import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const currentDiaryItem = useDiary(Number(params.id));
  if (!currentDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createdDate, emotionId, content } = currentDiaryItem;
  const title = getStringedDate(new Date(createdDate));
  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
