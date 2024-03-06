import PropTypes from "prop-types";
import { Link, useFetcher } from "react-router-dom";

const ArticleCard = ({ creationDate, title, content, articleId }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow-lg">
      <p>{creationDate}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="line-clamp-3">{content.replace(/(<([^>]+)>)/gi, "")}</p>
      <div className="flex gap-4">
        <Link
          to={`/articles/${articleId}`}
          className="rounded bg-black p-2 text-white"
        >
          See more
        </Link>
        <Link
          to={`/articles/${articleId}/edit`}
          className="rounded bg-black p-2 text-white"
        >
          Edit
        </Link>

        <Link
          to={`/articles/${articleId}/delete`}
          className="rounded bg-black p-2 text-white"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  creationDate: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  articleId: PropTypes.string,
};

export default ArticleCard;
