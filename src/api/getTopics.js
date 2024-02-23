import { hostname } from "../globals/hostname";

export const getTopics = async () => {
  try {
    const res = await fetch(`${hostname}/api/v1/topics`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return { topics: [] };
  } catch (err) {
    throw new Response("", { status: 500, statusText: "Get topics failed!" });
  }
};
