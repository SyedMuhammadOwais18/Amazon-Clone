import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";


function Header() {
  const [{basket , user},dispatch] = useStateValue(); 

  const handleAuthentication = () => {
      if(user){
        auth.signOut()
      }
  }
  return (
    <div className="header">
      <Link to ="/" >
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchinput" type="text" />
        <SearchIcon className="header_searchicon" />
      </div>
      <div className="header_nav">
        {/* //if there is no user only then push to login page */}
        <Link to={!user && "/login"}>
        <div onClick = {handleAuthentication} className="header_option">
          <span className="header_optionlineone">Hello</span>
          <span className="header_optionlinetwo">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
        </Link>
        <div className="header_option">
          <span className="header_optionlineone">Returns</span>
          <span className="header_optionlinetwo">& Orders</span>
        </div>
        <div className="header_option">
          <span className="header_optionlineone">Your</span>
          <span className="header_optionlinetwo">Prime</span>
        </div>
        <Link to ="/checkout">
        <div className="header_optionbasket">
          <AddShoppingCartOutlinedIcon />
          <span className="header_optionlinetwo header_optionbasketcount">
            {basket?.length}
          </span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
