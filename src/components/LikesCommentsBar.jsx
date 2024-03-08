import PropTypes from "prop-types";

const LikesCommentsBar = ({ likesNumber, commentsNumber }) => {
  return (
    <div className="relative my-8 flex gap-4 border-b border-t border-gray-200 p-3">
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <span className="icon-[mdi--like]"></span>
        {likesNumber}
      </div>
      <div className="flex items-center gap-2 text-xl text-gray-500">
        <span className="icon-[mdi--comment-outline]"></span>
        {commentsNumber}
      </div>
    </div>
  );
};

LikesCommentsBar.propTypes = {
  likesNumber: PropTypes.number,
  commentsNumber: PropTypes.number,
};

export default LikesCommentsBar;
