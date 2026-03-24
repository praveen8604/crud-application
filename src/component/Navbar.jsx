import React from "react";
//Bookname> BootTitleName> AuthorName> SellingPrice> PublishDate;
const Navbar = () => {
  return (
    <div className="w-full flex justify-between h-15 items-center bg-gray-200 shadow px-5 ">
      <div className="w-[10%] flex items-center h-full">
        <h1 LOGO className="font-bold text-zinc-800">
          LOGO
        </h1>
      </div>
      <div className="w-[50%] h-full">
        <ul className="w-full flex gap-6 list-none items-center text-zinc-800 font-medium ">
          <li Home className="cursor-pointer">
            Home
          </li>
          <li ABOUT className="cursor-pointer">
            ABOUT
          </li>
          <li CONTACT className="cursor-pointer">
            CONTACT
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
