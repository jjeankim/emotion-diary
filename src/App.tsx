import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import { createContext, useReducer } from "react";
import { DiaryItemProps } from "./type/type";
import { createDiary, deleteDiary, updateDiary } from "./api/diary";

export type DiaryDispatchContextType = {
  onCreate: (content: string) => void;
  onUpdate: (
    id: string,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: string) => void;
};

interface DiaryUpdatedData {
  id: string;
  emotionId:number;
  content:string;
}

type DiaryAction =
  | { type: "CREATE"; data: DiaryItemProps }
  | { type: "UPDATE"; data: DiaryUpdatedData }
  | { type: "DELETE"; id: string };

function reducer(
  state: DiaryItemProps[],
  action: DiaryAction
): DiaryItemProps[] {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.data.id ?{...item, ...action.data} : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

export const DiaryStateContext = createContext<DiaryItemProps[] | undefined>(
  undefined
);
export const DiaryDispatchContext = createContext<
  DiaryDispatchContextType | undefined
>(undefined);

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const nav = useNavigate()

  const onCreate = async (content: string) => {
    try {
      const newDiary = await createDiary(content);
      dispatch({
        type: "CREATE",
        data: newDiary,
      });
    } catch (error) {
      console.error("일기 생성 실패:", error);
      window.alert("일기 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onUpdate = async (
    id:string,
    emotionId: number,
    content: string
  ) => {
    try {
      await updateDiary(id, emotionId, content)
      dispatch({
        type: "UPDATE",
        data:{
          id,
          emotionId,
          content,
        }
      })
      nav(`/diary/${id}`)
    } catch (error) {
      console.error('일기 수정 실패:', error)
      window.alert("일기 수정에 실패했습니다.")
    }
  };

  const onDelete = async (id: string) => {
    await deleteDiary(id)
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
