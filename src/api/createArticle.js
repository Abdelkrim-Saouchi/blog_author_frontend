import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const createArticle = async (formData, error) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const readTime = +formData.get("readTime");
  const topics = [...formData.get("topics").split(";")];
  const published = formData.get("published") === "true";
  const token = localStorage.getItem("author-jwt-token");

  try {
    const res = await fetch(`${hostname}/api/v1/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        readTime,
        topics,
        published,
      }),
    });

    if (res.ok) {
      return redirect("/");
    }

    const data = await res.json();
    error.serverErrors = data.errors;
    return error;
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Create article failed!",
    });
  }
};
