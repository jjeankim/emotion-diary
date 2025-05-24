import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary";
import { DiaryItemProps } from "../type/type";
import useDiaryStore from "../store/diaryStore";

const Edit = () => {
  const { onDelete, onUpdate } = useDiaryStore()
  const { id } = useParams();
  const nav = useNavigate();

  const currentDiaryItem = useDiary(id);

  if (!id) return <div>잘못된 접근입니다.</div>;

  const onClickDelete = async () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      await onDelete(id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = async (input: DiaryItemProps) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      await onUpdate(id, input.emotionId, input.content);
      nav("/", { replace: true });
    }
  };

  if (!currentDiaryItem) return <div>데이터 로딩 중...!</div>;

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
