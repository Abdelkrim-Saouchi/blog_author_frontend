import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const updateComment = async (id, commentId, token, content) => {
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/${id}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content }),
      },
    );

    if (res.ok) {
      return redirect(`/articles/${id}`);
    }
    return { ok: false };
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Fetch comment info failed",
    });
  }
};
