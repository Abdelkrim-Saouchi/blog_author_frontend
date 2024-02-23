import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createArticle } from "../api/createArticle";
import { getTopics } from "../api/getTopics";
import Topics from "../components/Topics";

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

  return await createArticle(formData, error);
};

export const loader = async () => {
  return await getTopics();
};

const WriteArticle = () => {
  const error = useActionData();
  const data = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

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
          disabled={busy}
          className="my-4 flex items-center gap-2 rounded-2xl bg-black p-3 text-white"
        >
          {busy ? (
            <>
              {" "}
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Creating{" "}
            </>
          ) : (
            "Create Article"
          )}
        </button>
      </Form>
    </main>
  );
};

export default WriteArticle;
