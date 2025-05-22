import { ReactNode } from "react";

export interface ButtonProps {
  text: string;
  type?: string;
  onClick: () => void;
}

export interface DiaryItemProps {
  id: number;
  emotionId: number;
  content: string;
  createdAt: Date;
}

export interface DiaryListProps {
  data: DiaryData[]
}

export type InitData = {
  id: number;
  createdAt: Date;
  emotionId: number;
  content: string;
}

export interface EditorProps {
  onSubmit: (input:InitData) => void;
  initData?: InitData;
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

export type DiaryData = {
  id: number;
  createdAt: Date;
  emotionId: number;
  content: string;
}