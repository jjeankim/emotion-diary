import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryData, DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext)!;
  const params = useParams();
  const nav = useNavigate();

  const currentDiaryItem = useDiary(Number(params.id))

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(Number(params.id));
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input:DiaryData) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        Number(params.id),
        input.createdDate,
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  if(!currentDiaryItem) return <div>데이터 로딩 중...!</div>

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={currentDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
