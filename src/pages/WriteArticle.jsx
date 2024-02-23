import { Editor } from "@tinymce/tinymce-react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import Topics from "../components/Topics";
import { hostname } from "../globals/hostname";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const error = {};
  if (formData.get("title") === "") {
    error.message = "*Title must not be empty";
    return error;
  }
  if (formData.get("content") === "") {
    error.message = "*Content must not be empty";
    return error;
  }
  if (formData.get("topics") === "") {
    error.message = "*Select at least one topic";
    return error;
  }

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

export const loader = async () => {
  try {
    const res = await fetch(`${hostname}/api/v1/topics`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return { topics: [] };
  } catch (err) {
    throw new Response("", { status: 500, statusText: "Get topics failed!" });
  }
};

const WriteArticle = () => {
  const error = useActionData();
  const data = useLoaderData();

  console.log("data:", data);

  return (
    <main className="px-4 py-2 pt-4 md:px-40">
      <p className="mb-4 font-bold text-red-600">{error?.message}</p>
      {error?.serverErrors?.length > 0 && (
        <ul className="mb-4 list-inside list-disc text-red-600">
          {error.serverErrors.map((element, index) => {
            return <li key={index}>{element.msg}</li>;
          })}
        </ul>
      )}

      <Form method="post">
        <div className="my-4 flex items-center gap-2 rounded border border-slate-100 p-2 text-3xl shadow">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full outline-none"
          />
        </div>
        <div className="my-4 flex items-center gap-2 ">
          <label htmlFor="readTime" className="font-bold">
            Read time (min):
          </label>
          <input
            type="number"
            id="readTime"
            name="readTime"
            min={3}
            defaultValue={3}
            required
            className="border border-slate-100 pl-3 outline-none"
          />
        </div>
        <div className="my-4 flex items-center gap-2 ">
          <p className="font-bold">Status:</p>
          <div className="flex items-center gap-3">
            <div className="space-x-2">
              <input
                type="radio"
                name="published"
                id="published"
                value={true}
                defaultChecked
              />
              <label htmlFor="published">Published</label>
            </div>
            <div className="space-x-2">
              <input
                type="radio"
                name="published"
                id="unpublished"
                value={false}
              />
              <label htmlFor="unpublished">Unpublished</label>
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center gap-4">
          <Topics data={data} />
        </div>

        <Editor
          textareaName="content"
          required
          apiKey="tipmujbsdn0w9z77o2nmmsiqniyyv0zn1ee7ftkwfdahbna0"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant"),
              ),
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <button
          type="submit"
          className="my-4 flex items-center gap-2 rounded-2xl bg-black p-3 text-white"
        >
          Create article
        </button>
      </Form>
    </main>
  );
};

export default WriteArticle;
