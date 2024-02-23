import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Topics = ({ data }) => {
  const menuRef = useRef(null);
  const [topics, setTopics] = useState([]);

  const toggleTopicsMenu = () => {
    menuRef.current.classList.toggle("hidden");
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      menuRef.current.classList.add("hidden");
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setTopics((prev) => [...prev, e.target.value]);
    } else {
      setTopics((prev) => prev.filter((el) => el !== e.target.value));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <p className="font-bold">Topics:</p>
      <input type="text" hidden defaultValue={topics.join(";")} name="topics" />
      <div className="relative">
        <button
          type="button"
          onClick={toggleTopicsMenu}
          className="flex items-center justify-between gap-2 border border-slate-100 p-2"
        >
          Select <span className="icon-[mdi--keyboard-arrow-down]"></span>
        </button>

        <ul
          ref={menuRef}
          className="absolute z-10 flex hidden h-24 w-max flex-col gap-2 overflow-auto border border-slate-100 bg-white p-2 shadow"
        >
          {data?.topics.map((topic) => (
            <li key={topic._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={topic._id}
                id={topic.name.replace(" ", "_")}
                onChange={handleChange}
              />{" "}
              <label htmlFor={topic.name.replace(" ", "_")}>{topic.name}</label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Topics.propTypes = {
  data: PropTypes.object,
};

export default Topics;
