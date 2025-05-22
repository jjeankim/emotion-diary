import { DiaryItem } from "../type/type";

const BASE_URL = "https://emotion-diary-api.onrender.com";

export const getDiary = async ():Promise<DiaryItem[]> => {
  const res = await fetch(`${BASE_URL}/diary`);
  if (!res.ok) throw new Error("Fetch failed");
  return await res.json();
};

export const createDiary = async (data: DiaryItem):Promise<DiaryItem> => {
  const res = await fetch(`${BASE_URL}/diary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Fetch failed");

  return await res.json();
};

export const updateDiary = async (
  emotionId: number,
  content: string,
  id: string
):Promise<DiaryItem> => {
  const res = await fetch(`${BASE_URL}/diary/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emotionId, content }),
  });
  if (!res.ok) throw new Error("Update failed");
  return await res.json();
};

export const deleteDiary = async (id: string):Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/diary/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
  return true
};
