import { ReactNode } from "react";

export interface ButtonProps {
  text: string;
  type?: string;
  onClick: () => void;
}

export interface DiaryItemProps {
  id: string;
  emotionId: number;
  content: string;
  createdAt: Date;
}

export interface DiaryListProps {
  data: DiaryItemProps[];
}

export interface EditorProps {
  onSubmit: (input: DiaryItemProps) => void;
  initData?: DiaryItemProps;
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
