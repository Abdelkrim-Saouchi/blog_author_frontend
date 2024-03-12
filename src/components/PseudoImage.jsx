import PropTypes from "prop-types";

const PseudoImage = ({ firstLetter }) => {
  return (
    <div className="flex w-fit items-center justify-center rounded-[50%] bg-sky-800  px-2">
      <span className="font-bold text-white">{firstLetter}</span>
    </div>
  );
};
PseudoImage.propTypes = {
  firstLetter: PropTypes.string,
};
export default PseudoImage;
