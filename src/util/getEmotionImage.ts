export function getEmotionImage (emotionId:number) {
  switch (emotionId) {
    case 1: return "/img/emotion1.png";
    case 2: return "/img/emotion2.png";
    case 3: return "/img/emotion3.png";
    case 4: return "/img/emotion4.png";
    case 5: return "/img/emotion5.png";
    default: return undefined;
  }
}

