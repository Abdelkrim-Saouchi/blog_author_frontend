import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PseudoImage from "./PseudoImage";

const Comment = ({ comment }) => {
  const [edit, setEdit] = useState(false);
  const menuRef = useRef(null);

  const toggleEditMenu = () => {
    setEdit((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="space-y-2 rounded border border-gray-200 p-3">
      <div className="relative flex gap-2 text-lg">
        <div className="flex items-center gap-2 font-bold">
          <PseudoImage
            firstLetter={
              comment.author.username
                ? comment.author.username[0].toUpperCase()
                : comment.author.firstName[0].toUpperCase()
            }
          />
          {comment.author?.username ||
            comment.author.firstName + " " + comment.author.lastName}
        </div>
        <div className="text-gray-500">{comment.creationDate}</div>
        <div className="ml-auto">
          <button onClick={toggleEditMenu} className="font-bold">
            ...
          </button>
          {edit && (
            <div
              ref={menuRef}
              className="absolute flex -translate-x-full flex-col gap-2 rounded border border-gray-200 bg-white px-4 py-2 shadow-lg"
            >
              <div>
                <Link
                  to={`comments/${comment._id}/update`}
                  onClick={toggleEditMenu}
                >
                  Update
                </Link>
              </div>
              <div>
                <Link
                  to={`comments/${comment._id}/delete`}
                  onClick={toggleEditMenu}
                >
                  Delete
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
