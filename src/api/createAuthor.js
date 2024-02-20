import { hostname } from "../globals/hostname";

export const createAuthor = async (formData) => {
  try {
    return await fetch(`${hostname}/api/v1/authors/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Create author failed!",
    });
  }
};
