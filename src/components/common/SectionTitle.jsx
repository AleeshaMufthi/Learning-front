import PropTypes  from "prop-types";
export default function SectionTitle({
    title = "No Title",
    description = "",
    tutor = false,
  }) {
    return (
      <>
        <h1
          className={`nexa-font text-start sm:ml-6 md:ml-10 lg:ml-16 drop-shadow-sm text-xl md:text-4xl pt-10 font-black ${
            tutor ? "text-amber-500" : "text-blue-700"
          }`}
        >
          {title}
        </h1>
        <span
          className={`text-gray-400 nexa-font text-start sm:ml-6 md:ml-10 lg:ml-16 text-sm pt-3 font-black`}
        >
          {description}
        </span>
      </>
    );
  }
  SectionTitle.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    tutor: PropTypes.bool,
  };