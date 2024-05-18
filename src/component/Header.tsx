
import React, {useState} from 'react';

import "../style/Header.css";
import styled from "styled-components";

import { Link } from 'react-router-dom';


import userIcin from "../icon/user.png";
import meniuicon from '../icon/menu.svg';

import FindComponent from './Find/FindComponent';
import Meniu from './Navigation/Meniu';

const Logo = styled.h1`
  margin: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 4px;
  left: 25px;
`;

const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const LoginBtn = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 10px;
  padding: 2px;
  padding-right: 8px;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0.3px 0.3px 2px 0.1px black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.8s ease-in-out;
  background-color: rgb(10, 15, 30, 0.3);

        &:hover{
  box-shadow: 0.3px 0.3px 2px 0.1px black inset;
  background-color: rgb(210, 105, 30, 0.1);
}

samp {
  margin: 2px;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 750px) {

  right: 60px;

}

`;


const MeniuBtn = styled.div`
    display: none;
    @media only screen and (max-width: 750px) {

      display:flex;
      rigth: 10px;

      position: absolute; 
      right: 10px;
      cursor:pointer;
      &:hover{
        box-shadow:0px 0px 1px 0px;
      }
    }
    
`;

  const HeaderComponent = styled.div`
    padding: 0px 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    // height: 20%;
    max-height: 250px;
    box-shadow: 2px 2px 6px 0.5px rgb(0, 0, 0 , 0.8);
    backdrop-filter: blur(2px);
    position: relative;
    min-height: 100px;
    grid-row: 1;
    grid-column: 1;
    background-color: rgb(51, 51, 51, 0.2);
    margin-bottom: 4px;


  `;

interface HeaderProps {
  login: any;
  setLogIn: any;
  usermode: boolean;
  setProduct: Function;
}



const Header: React.FC<HeaderProps> = ({
      login,
      setLogIn,
      usermode,
      setProduct,
}) => {


  // const [menuVisible, setMenuVisible] = useState(false);
// const menuRef = useRef(null);

// function toggleMenu() {
//   setMenuVisible(!menuVisible);
// }


const [menuVisible, setMenuVisible] = useState(false);

const toggleMenu = () => {
  setMenuVisible(!menuVisible);
}



  const loginbtn = () => {
    !login ? setLogIn(true) : setLogIn(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("address");

    localStorage.removeItem("favorits");
    window.location.reload();
  };


  const MeniuProps ={ usermode, setProduct};



  return (
    <HeaderComponent>

      <div style={{height: '80px'}}>

      {/* ავტორიზებული მომხმარებლის მონაცემები ან ლოგო */}
      <>
        {usermode ? (
          <div className="userinhear">
            <img className="user-icon" src={userIcin} alt="User Icon" />
            <Userinfo>
              <h2>{localStorage.getItem("user")}</h2>
              <h4>{localStorage.getItem("address")}</h4>
            </Userinfo>
          </div>
        ) : (
         <Link to={'/'}> <Logo>MyShop.App</Logo> </Link>
        )}
      </>

      {/* სისტემაში შესვლა */}
      {!usermode &&
        <LoginBtn onClick={loginbtn}>
          <samp>
            <img width={30} src={userIcin} alt="user icon" />
          </samp>
          <Link to="/login"><samp>Login</samp></Link>
          
        </LoginBtn>
      }

      {/* სისტემიდან გამოსვლა */}
      {usermode && (
        <>
        <div
          style={{ padding: "3px 8px ", right: "12px" }}
          onClick={logout}
          className="userBtn"
        >
                
                <Link to="/">
          <samp>Log Out</samp></Link>
        </div>

        </>

      )}
        <MeniuBtn onClick={()=>{toggleMenu()}}>
        <img src={meniuicon} alt="" /> 
        </MeniuBtn>

        </div>


        <FindComponent />




        <Meniu {...MeniuProps}  menuVisible={menuVisible} toggleMenu={toggleMenu}  />


        {/* <Meniu /> */}

    </HeaderComponent>
  );
};

export default Header;
