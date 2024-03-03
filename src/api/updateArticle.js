import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const updateArticle = async (articleId, token, formData) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${articleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      return redirect("/");
    }
    return { ok: false };
  } catch (err) {
    throw new Response("", {
      status: 404,
      statusText: "Uptading article failed",
    });
  }
};
