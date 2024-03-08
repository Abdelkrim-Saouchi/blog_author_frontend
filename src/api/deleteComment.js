import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const deleteComment = async (id, commentId, token) => {
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/${id}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.ok) {
      return redirect(`/articles/${id}`);
    }
    return { ok: false };
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Delete comment failed",
    });
  }
};
