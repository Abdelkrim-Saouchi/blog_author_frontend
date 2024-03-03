import { hostname } from "../globals/hostname";

export const getArticle = async (articleId) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${articleId}`);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return { message: "article not found" };
  } catch (err) {
    throw new Response("", {
      status: 404,
      statusText: "Article not found. fetch failed",
    });
  }
};
