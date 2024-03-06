import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const deleteTopic = async (topicId, token, error) => {
  try {
    const res = await fetch(`${hostname}/api/v1/topics/${topicId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return redirect("/topics");
    }
    error.deleteError = "Server Error. delete topic failed";
    return error;
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Delete topic failed",
    });
  }
};
