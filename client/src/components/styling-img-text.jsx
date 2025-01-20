import { Link } from "react-router-dom";

const StylingImageText = ({ img, text, onClick, link }) => {
  return (
    <Link
      to={link}
      className="flex-col  rounded-sm items-center justify-center text-center "
    >
      <div className="hover:bg-white">
        <img
          onClick={onClick}
<<<<<<< HEAD
          className="w-[34px] object-fit  h-[34px] rounded-sm"
          src={`https://apna-darzi-samar.onrender.com/uploads/${img}`}
=======
          className="w-[10vw] object-fit  h-[10vw] rounded-sm"
          src={`https://apna-darzi-samar.onrender.com/uploads/${img}`}
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
