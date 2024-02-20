import { hostname } from "../globals/hostname";

export const getArticles = async () => {
  const token = localStorage.getItem("author-jwt-token");

  try {
    const res = await fetch(`${hostname}/api/v1/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (err) {
    throw new Response("", {
      status: 404,
      statusText: "Fetch failed. No data",
    });
  }
};
