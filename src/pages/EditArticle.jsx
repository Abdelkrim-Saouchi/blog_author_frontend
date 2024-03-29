import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
// import { getTopics } from "../api/getTopics";
import Topics from "../components/Topics";
import { getArticle } from "../api/getArticle";
import { updateArticle } from "../api/updateArticle";
import { getTopics } from "../api/getTopics";
import useAutoLogout from "../hooks/useAutoLogout";

export const action = async ({ request, params }) => {
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
  const token = localStorage.getItem("author-jwt-token");
  return await updateArticle(params.articleId, token, formData);
};

export const loader = async ({ params }) => {
  const [topicsData, article] = await Promise.all([
    await getTopics(),
    await getArticle(params.articleId),
  ]);
  article.topics = topicsData.topics;
  return article;
};

const EditArticle = () => {
  const error = useActionData();
  const data = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const [title, setTitle] = useState(data.title);
  const contentEditorRef = useRef(null);
  const [content, setContent] = useState(data.content);
  const editorBtnRef = useRef(null);
  const previewBtnRef = useRef(null);
  const [base64String, setBase64String] = useState("");
  const [imgURL, setImgURL] = useState(null);

  // logout automatically if jwt token is invalid
  useAutoLogout();

  const togglePreview = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === "Editor") {
      editorRef.current.classList.remove("hidden");
      previewRef.current.classList.add("hidden");
      editorBtnRef.current.classList.add("bg-slate-400");
      previewBtnRef.current.classList.remove("bg-slate-400");
    } else {
      editorRef.current.classList.add("hidden");
      previewRef.current.classList.remove("hidden");
      editorBtnRef.current.classList.remove("bg-slate-400");
      previewBtnRef.current.classList.add("bg-slate-400");
    }
  };

  const handleFileChange = (e) => {
    setImgURL(null);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result);
    };
    reader.readAsDataURL(file);
    setImgURL(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(imgURL);
  }, [imgURL]);

  return (
    <main className="flex flex-col px-4 py-2 pt-4 md:px-40">
      <div className="flex gap-1 self-center rounded-lg bg-slate-100  shadow-lg">
        <button
          ref={editorBtnRef}
          onClick={togglePreview}
          className="rounded-lg bg-slate-400 p-2"
        >
          Editor
        </button>
        <button
          ref={previewBtnRef}
          onClick={togglePreview}
          className="rounded-lg p-2"
        >
          preview
        </button>
      </div>

      <div ref={editorRef}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
          <div className="my-4 flex items-center gap-2 ">
            <label htmlFor="img" className="font-bold">
              Image:
            </label>
            <input
              type="file"
              id="img"
              name="imgFile"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mx-2 file:cursor-pointer file:rounded-md file:bg-black file:px-4 file:py-1 file:text-white file:hover:opacity-70"
            />
            <input type="text" name="file" defaultValue={base64String} hidden />
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
              defaultValue={data.readTime}
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
                  defaultChecked={data.published === true}
                />
                <label htmlFor="published">Published</label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  name="published"
                  id="unpublished"
                  value={false}
                  defaultChecked={data.published === false}
                />
                <label htmlFor="unpublished">Unpublished</label>
              </div>
            </div>
          </div>
          <div className="my-4 flex items-center gap-4">
            <Topics data={{ topics: data.topics }} />
          </div>
          <Editor
            ref={contentEditorRef}
            textareaName="content"
            required
            apiKey="tipmujbsdn0w9z77o2nmmsiqniyyv0zn1ee7ftkwfdahbna0"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount  linkchecker",
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
            initialValue={content}
            onChange={(e) => setContent(e.target.getContent())}
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
                Updating{" "}
              </>
            ) : (
              "Update Article"
            )}
          </button>
        </Form>
      </div>

      <div ref={previewRef} className="my-4 flex hidden flex-col">
        <h2 className="mb-6 self-center text-3xl font-bold">{title}</h2>
        {imgURL && <img src={imgURL} alt="uploaded" />}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose max-w-full "
        ></div>
      </div>
    </main>
  );
};

export default EditArticle;
