import { hostname } from "../globals/hostname";

export const login = (formData) => {
  try {
    return fetch(`${hostname}/api/v1/authors/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  } catch (err) {
    throw new Response("", { status: 500, statusText: "Login author failed!" });
  }
};
