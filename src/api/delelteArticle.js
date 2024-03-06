import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const deleteArticle = async (articleId) => {
  const token = localStorage.getItem("author-jwt-token");

  try {
    const res = await fetch(`${hostname}/api/v1/posts/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return redirect("/");
    }
    return { ok: false };
  } catch (err) {
    throw new Response("", { status: 500, statusText: "Delete post failed" });
  }
};
