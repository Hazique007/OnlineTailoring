import React, { useContext, useState, useEffect } from "react";
import { IoHome, IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { SearchContext } from "../Context Api/searchContext";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const TopNavIcon = ({ label, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center h-[62px] justify-center w-full"
    >
      {image}
      <h2 className="text-[12px] font-poppins text-black font-[450]">
        {label}
      </h2>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const { isSearch, setIsSearch } = useContext(SearchContext);
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch profile picture from the backend
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch("http://localhost:3000/listpersonal");
        if (response.ok) {
          const data = await response.json();
          setProfilePicture(data.profilePicture); // Assuming the response contains the profile picture URL
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };
    fetchProfilePicture();
  }, []);

  const handleSearch = () => {
    setIsSearch(!isSearch);
    navigate("/search");
  };

  return (
    <div className="Navigation h-[62px] bottom-0 fixed flex items-center justify-evenly bg-[#FAF1F1] w-full">
      <TopNavIcon
        onClick={() => navigate("/Home")}
        label={"Home"}
        image={<IoHome className="h-[25px] w-[25px]" />}
      />
      <TopNavIcon
        label={"Search"}
        image={<IoSearch className="h-[25px] w-[25px]" />}
        onClick={handleSearch}
      />
      <TopNavIcon
        onClick={() => navigate("/Allcategory")}
        label={"Shop"}
        image={<PiSquaresFourBold className="h-[25px] w-[25px]" />}
      />
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={3} color="secondary">
          <TopNavIcon
            label={"Cart"}
            image={<IoCartOutline className="text-black h-[25px] w-[25px]" />}
          />
        </StyledBadge>
      </IconButton>
      <TopNavIcon
        onClick={() => navigate("/profile")}
        label={"Profile"}
        image={
          profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="h-[25px] w-[25px] rounded-full object-cover"
            />
          ) : (
            <CgProfile className="h-[25px] w-[25px]" />
          )
        }
      />
    </div>
  );
};

export default Navbar;
