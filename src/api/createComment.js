import { hostname } from "../globals/hostname";

export const createComment = async (postId, token, content) => {
  try {
    const res = await fetch(`${hostname}/api/v1/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: postId,
        content: content,
      }),
    });
    if (res.ok) {
      return { ok: true };
    }

    return { ok: false };
  } catch (err) {
    throw new Response("", { status: 500, statusText: "Add comment failed" });
  }
};
