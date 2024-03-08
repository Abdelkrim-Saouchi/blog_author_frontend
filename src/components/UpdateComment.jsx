import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getCommentInfo } from "../api/getCommentInfo";
import { updateComment } from "../api/updateComment";

export const action = async ({ params, request }) => {
  const { articleId, commentId } = params;
  const token = localStorage.getItem("author-jwt-token");
  const formData = await request.formData();
  const content = formData.get("commentText");

  return await updateComment(articleId, commentId, token, content);
};

export const loader = async ({ params }) => {
  const { articleId, commentId } = params;
  const token = localStorage.getItem("author-jwt-token");

  return await getCommentInfo(articleId, commentId, token);
};

const UpdateComment = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  const cancel = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="fixed z-10 flex flex-col items-center justify-center gap-4 rounded bg-slate-200 p-4 shadow-lg">
      <div>
        <Form method="post" className="mb-6 flex resize-y flex-col gap-2">
          <textarea
            name="commentText"
            id="comment"
            rows="5"
            defaultValue={data.content}
            className="rounded border border-gray-200 p-3"
            required
          ></textarea>
          <div className="flex gap-4">
            <button
              type="submit"
              name="commentBtn"
              value="update"
              className="flex items-center gap-2 self-start rounded bg-black p-3 text-white"
            >
              {busy ? (
                <>
                  <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                  Processing
                </>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="flex items-center gap-2 self-start rounded bg-black p-3 text-white"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateComment;
