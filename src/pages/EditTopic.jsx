import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getTopic } from "../api/getTopic";
import { updateTopic } from "../api/updateTopic";
import { deleteTopic } from "../api/deleteTopic";
import useAutoLogout from "../hooks/useAutoLogout";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const error = {};
  const token = localStorage.getItem("author-jwt-token");

  // update topic
  if (formData.get("editBtn") === "update") {
    if (formData.get("name") === "") {
      error.message = "Name must not be empty";
      return error;
    }
    return await updateTopic(params.topicId, token, formData, error);
  }

  // delete topic
  if (formData.get("editBtn") === "delete") {
    return await deleteTopic(params.topicId, token, error);
  }
};

export const loader = async ({ params }) => {
  return await getTopic(params.topicId);
};

const EditTopic = () => {
  const { topic } = useLoaderData();
  const data = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  // logout automatically if jwt token is invalid
  useAutoLogout();

  return (
    <main className="space-y-4 px-4 py-2 pt-4 md:px-40">
      <h2 className="text-2xl font-bold">Update Topic:</h2>
      <p className="text-red-600">{data?.message}</p>
      <p className="text-red-600">{data?.serverError}</p>
      <Form method="post" className="flex w-fit flex-col">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          defaultValue={topic.name}
          className="rounded border p-3 shadow "
        />
        <button
          name="editBtn"
          value="update"
          className="my-4 flex items-center gap-2 self-start rounded-2xl bg-black p-3 text-white"
        >
          {busy ? (
            <>
              {" "}
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Updating{" "}
            </>
          ) : (
            "Update "
          )}
        </button>
      </Form>
      <h2 className="text-2xl font-bold">Delete Topic:</h2>
      <Form method="post">
        <p>Are you sure you want to delete this topic?</p>
        <p className="text-red-600">{data?.deleteError}</p>
        <button
          name="editBtn"
          value="delete"
          className="my-4 flex items-center gap-2 rounded-2xl bg-black p-3 text-white"
        >
          {busy ? (
            <>
              {" "}
              <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
              Deleting{" "}
            </>
          ) : (
            "Delete"
          )}
        </button>
      </Form>
    </main>
  );
};
export default EditTopic;
