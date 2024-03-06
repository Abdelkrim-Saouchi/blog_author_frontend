import { redirect } from "react-router-dom";
import { hostname } from "../globals/hostname";

export const updateTopic = async (topicId, token, formData, error) => {
  try {
    const res = await fetch(`${hostname}/api/v1/topics/${topicId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    console.log("res", res);
    if (res.ok) {
      return redirect("/topics");
    }
    error.serverError = "Server error update failed";
    return error;
  } catch (err) {
    console.log(err);
    throw new Response("", {
      status: 500,
      statusText: "Update topic failed",
    });
  }
};
