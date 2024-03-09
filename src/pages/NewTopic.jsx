import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { hostname } from "../globals/hostname";
import useAutoLogout from "../hooks/useAutoLogout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const error = {};
  if (formData.get("name") === "") {
    error.nameError = "Topic name must not be empty.";
    return error;
  }
  const token = localStorage.getItem("author-jwt-token");
  try {
    const res = await fetch(`${hostname}/api/v1/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.get("name"),
      }),
    });

    if (res.ok) {
      return redirect("/write");
    }
    if (res.status === 400) {
      error.invalidName = "Topic name is invalid";
      return error;
    }
    error.serverError = "Server Error try later";
    return error;
  } catch (err) {
    throw new Response("", {
      status: 500,
      statusText: "Create topics failed!",
    });
  }
};

const NewTopic = () => {
  const error = useActionData();

  // logout automatically if jwt token is invalid
  useAutoLogout();

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <h2 className="mb-4 text-3xl font-bold">Create new topic:</h2>
      {error?.nameError && <p className="text-red-600">{error.nameError}</p>}

      {error?.invalidName && (
        <p className="text-red-600">{error.invalidName}</p>
      )}

      {error?.serverError && (
        <p className="text-red-600">{error.serverError}</p>
      )}

      <Form method="post" className="space-y-4">
        <div className="space-x-3">
          <label htmlFor="topic" className="opacity-75">
            Name:
          </label>
          <input
            id="topic"
            type="text"
            name="name"
            placeholder="Ex: Javascript"
            className="rounded border border-gray-50 p-3"
          />
        </div>
        <button type="submit" className="rounded bg-black p-2 text-white">
          Create
        </button>
      </Form>
    </main>
  );
};
export default NewTopic;
