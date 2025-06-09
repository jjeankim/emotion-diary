import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { DiaryItemProps } from "../type/type";
import useDiaryStore from "../store/diaryStore";

const New = () => {
  const { onCreate } = useDiaryStore()
  const nav = useNavigate();

  const onSubmit = async (input: DiaryItemProps) => {
    await onCreate(input);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text="< 뒤로가기" />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
