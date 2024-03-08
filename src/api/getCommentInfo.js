import { hostname } from "../globals/hostname";

export const getCommentInfo = async (id, commentId, token) => {
  try {
    const res = await fetch(
      `${hostname}/api/v1/posts/${id}/comments/${commentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.ok) {
      return await res.json();
    }
    return { ok: false };
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Fetch comment info failed",
    });
  }
};
