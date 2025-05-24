import { create } from "zustand";
import { DiaryItemProps } from "../type/type";
import { createDiary, deleteDiary, getDiary, updateDiary } from "../api/diary";

interface DiaryStore {
  data: DiaryItemProps[];
  fetchData: () => Promise<void>;
  onCreate: (content: string) => Promise<void>;
  onUpdate: (id: string, emotionId: number, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const useDiaryStore = create<DiaryStore>((set, get) => ({
  data: [],
  fetchData: async () => {
    try {
      const diaryList = await getDiary();
      set({ data: diaryList });
    } catch (err) {
      console.error("일기 불러오기 실패:", err);
    }
  },

  onCreate: async (content) => {
    try {
      const newDiary = await createDiary(content);
      set((state) => ({ data: [newDiary, ...state.data] }));
    } catch (err) {
      console.error("일기 생성 실패:", err);
      window.alert("일기 생성에 실패했습니다. 다시 시도해주세요.");
    }
  },

  onUpdate: async (id, emotionId, content) => {
    try {
      await updateDiary(id, emotionId, content);
      set((state) => ({
        data: state.data.map((item) =>
          item._id === id ? { ...item, emotionId, content } : item
        ),
      }));
    } catch (err) {
      console.error("일기 수정 실패:", err);
      window.alert("일기 수정에 실패했습니다.");
    }
  },
  onDelete: async (id) => {
    try {
      await deleteDiary(id);
      set((state) => ({
        data: state.data.filter((item) => item._id !== id),
      }));
    } catch (err) {
      console.error("일기 삭제 실패:", err);
    }
  },
}));

export default useDiaryStore;
