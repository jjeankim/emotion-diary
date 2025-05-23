import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./DiaryItem.css";
import { getEmotionImage } from "../util/getEmotionImage";
import { DiaryItemProps } from "../type/type";

const DiaryItem = ({ _id, emotionId, content, createdAt }: DiaryItemProps) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${_id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} alt="" />
      </div>
      <div onClick={() => nav(`/diary/${_id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => nav(`/edit/${_id}`)}
          text="수정하기
        "
        />
      </div>
    </div>
  );
};

export default DiaryItem;
