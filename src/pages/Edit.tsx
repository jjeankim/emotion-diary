import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import { DiaryItemProps } from "../type/type";

const Edit = () => {
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext)!;
  const params = useParams();
  const nav = useNavigate();

  const currentDiaryItem = useDiary(params.id as string)

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id as string);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input:DiaryItemProps) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id as string,
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
