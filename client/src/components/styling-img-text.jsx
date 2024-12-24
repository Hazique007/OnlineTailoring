import { Link } from "react-router-dom";

const StylingImageText = ({ img, text, onClick, link }) => {
  return (
    <Link
      to={link}
      className="flex-col  rounded-sm items-center justify-center text-center "
    >
      <div className="  hover:bg-white">
        <img
          onClick={onClick}
          className="w-[35px] object-fit  h-[35px] rounded-sm"
          src={`https://online-tailoring-3.onrender.com/uploads/${img}`}
          alt=""
        />
      </div>
      <p className="text-[10px] mt-1 font-[400] leading-[15px] font-poppins">
        {text}
      </p>
    </Link>
  );
};

export default StylingImageText;
