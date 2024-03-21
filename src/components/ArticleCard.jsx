import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ArticleCard = ({ imgURL, creationDate, title, content, articleId }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow-lg">
      {imgURL && <img src={imgURL} alt="article" />}
      <p>{creationDate}</p>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="line-clamp-3">{content.replace(/(<([^>]+)>)/gi, "")}</p>
      <div className="mt-auto flex gap-4">
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
  imgURL: PropTypes.any,
  creationDate: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  articleId: PropTypes.string,
};

export default ArticleCard;
