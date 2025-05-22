import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import { createContext, useReducer, useRef } from "react";
import { DiaryData } from "./type/type";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"

export type DiaryDispatchContextType = {
  onCreate: (createdDate: Date, emotionId: number, content: string) => void;
  onUpdate: (
    id: number,
    createdDate: Date,
    emotionId: number,
    content: string
  ) => void;
  onDelete: (id: number) => void;
};

type DiaryAction =
  | { type: "CREATE"; data: DiaryData }
  | { type: "UPDATE"; data: DiaryData }
  | { type: "DELETE"; id: number };

function reducer(state: DiaryData[], action: DiaryAction): DiaryData[] {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext<DiaryData[] | undefined>(
  undefined
);
export const DiaryDispatchContext = createContext<
  DiaryDispatchContextType | undefined
>(undefined);

const mockData = [
  {
    id: 1,
    createdAt: new Date("2025-02-19"),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdAt: new Date("2025-02-18"),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdAt: new Date("2025-01-20"),
    emotionId: 3,
    content: "3번 일기 내용",
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (createdAt: Date, emotionId: number, content: string) => {
    dispatch({
      type: "CREATE",
      data: {
        createdAt,
        emotionId,
        content,
        id: idRef.current++,
      },
    });
  };

  const onUpdate = (
    id: number,
    createdAt: Date,
    emotionId: number,
    content: string
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdAt,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id: number) => {
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
