import { EmotionItemPrpos } from "../type/type";
import { getEmotionImage } from "../util/getEmotionImage";
import "./EmotionItem.css";

const EmotionItem = ({
  emotionId,
  emotionName,
  isSelected,
  onClick,
}: EmotionItemPrpos) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
