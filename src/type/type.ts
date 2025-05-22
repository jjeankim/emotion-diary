import { ReactNode } from "react";

export interface ButtonProps {
  text: string;
  type?: string;
  onClick: () => void;
}

export interface DiaryItem {
  id?: string;
  emotionId: number;
  content: string;
  createdAt: Date;
}

export interface DiaryListProps {
  data: DiaryItem[]
}

export interface EditorProps {
  onSubmit: (input: DiaryItem) => void;
  initData?: DiaryItem;
}

export interface EmotionItemPrpos {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
  onClick: () => void;
}

export interface HeaderProps {
  title: string;
  leftChild: ReactNode;
  rightChild?: ReactNode;
}

export interface ViewerProps {
  emotionId: number;
  content: string;
}
