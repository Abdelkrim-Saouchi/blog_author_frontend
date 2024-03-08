import PropTypes from "prop-types";
import { Link, useFetcher, useParams } from "react-router-dom";
import Comment from "./Comment";
import { useStore } from "../store/useStore";

const CommentsSection = ({ comments }) => {
  const { articleId } = useParams();
  const token = useStore((state) => state.token);
  const fetcher = useFetcher();
  const busy = fetcher.state === "submitting";
  const isOk = fetcher.data ? fetcher.data.ok : true;

  return (
    <div>
      {token && (
        <fetcher.Form
          method="post"
          action={`/articles/${articleId}`}
          className="mb-6 flex resize-y flex-col gap-2"
        >
          <textarea
            name="commentText"
            id="comment"
            rows="5"
            className="rounded border border-gray-200 p-3"
            required
            disabled={busy}
          ></textarea>
          <button
            type="submit"
            name="commentBtn"
            value="create"
            disabled={busy}
            className="flex items-center gap-2 self-start rounded bg-black p-3 text-white"
          >
            {busy ? (
              <>
                <span className="icon-[ph--spinner-gap-light] animate-spin"></span>
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </button>
        </fetcher.Form>
      )}

      {!token && (
        <div className="mb-4 rounded border border-red-200 p-3 text-center text-red-600">
          <p className="mb-4">
            You are not log in. You must log in to comment this article
          </p>
          <Link to="/login" className="rounded bg-black p-2 text-white">
            Log in
          </Link>
        </div>
      )}

      {!isOk && (
        <p className="mb-4 text-red-600">
          Something wrong happened! Try later.
        </p>
      )}

      <div className="mb-6 flex flex-col gap-4">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  comments: PropTypes.array,
};

export default CommentsSection;
