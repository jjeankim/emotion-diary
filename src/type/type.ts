import { ReactNode } from "react";

//App.ts Type
export interface DiaryItemProps {
  _id: string;
  emotionId: number;
  content: string;
  createdAt: Date;
}

export type DiaryAction =
  | { type: "INIT"; data: DiaryItemProps[] }
  | { type: "CREATE"; data: DiaryItemProps }
  | { type: "UPDATE"; data: DiaryUpdatedData }
  | { type: "DELETE"; id: string };

  //Context Type
  export interface DiaryDispatchContextType {
    onCreate: (content: string) => void;
    onUpdate: (id: string, emotionId: number, content: string) => void;
    onDelete: (id: string) => void;
  };
  
  export interface DiaryUpdatedData {
    id: string;
    emotionId: number;
    content: string;
  }

  //component Type
export interface ButtonProps {
  text: string;
  type?: string;
  onClick: () => void;
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

