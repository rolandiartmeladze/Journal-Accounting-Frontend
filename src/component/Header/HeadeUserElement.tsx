import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userIcin, arrow } from "./Tools";


const UserInfo = styled.div<{ active: boolean }>`
display: flex;
// position: absolute;
position: relative;
margin-top: 5px;
margin-right: 28px;
transition: 0.4s ease-in-out;
border-radius: 6px;
cursor: pointer;
font-weight: 800;
flex-direction: column;
z-index: 5;
transition: 0.3s eae-in-out;


&:before {
position: absolute;
content: "";
display: block;
width: 0%;
height: 40px; 
background: none;
z-index: -1;
padding-bottom: 10px;
}

&:hover {
  &:before{
    transition: width 0.5s ease-in-out, height 1.1s ease-in-out; 
    border-radius: 6px;
    width: 100%;
    background-color: ${props => !props.active ? 'rgb(1, 51, 1, 0.9)' : 'none'};
    border-radius: ${props => !props.active ? '6px' : '10px'};
  }
  }
  
  


div {
padding: 5px 0;
height: auto;
display: flex;
align-items: flex-end;

samp {
display: flex;
flex-direction: column;
align-items: flex-start;
}

img {
margin: 0;
max-width: 40px;
}
}

.item {
width: 85%;
margin: auto;
color: white;
box-shadow: 0px 2px 2px 0.5px white;
margin-top: 7px;
align-items: center;
justify-content: center;
border-radius: 0px 0px 10px 10px;
transform: scale(0);
transition: 0.3s ease-in-out;


&:hover {
color: yellow;
box-shadow: 0px 2px 2px 0.5px yellow;
transform: scale(1.05) !important;
}
}

@media only screen and (max-width: 750px) {
right: 60px;
margin-right: 0px;

}

${({ active }) =>
active &&
`
&:before {
  width: 100%;
height: 100%; 
background-color: rgb(51, 51, 51); 
transition: width 0.3s ease-in-out, height 1.1s ease-in-out; 
border-radius: 10px;
}
`}
`;


interface Props{usermode: boolean;}

interface OpenProps{link: string;}

interface InfoItem {
    title: string;
    link: string;
  }


const UserElement = ({usermode}:Props)=>{

    const navigate = useNavigate();
    const [active, setActive] = useState(false);


    const anime = () => {
        const items = Array.from(document.getElementsByClassName('item')) as HTMLDivElement[];
            items.forEach((element, index) => {
            setTimeout(() => {element.style.transform = 'scale(1)' }, index * 200);
            });
      };
      
      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("address");
        localStorage.removeItem("favorits");
        window.location.reload();
      };
    

    const OpenInfo = ({link}:OpenProps)=>{
        active? setActive(false):setActive(true);
        setTimeout(() => { anime(); }, 200);
            if(link !== "null"){navigate(link)}
            if(link === '/'){logout()}
      }
    
 const styleInfoCont = {
  boxShadow: !active? '0px 2px 2px -1px rgb(1,1,1)': '0px 2px 2px -1px rgb(255,255,255)',
  borderRadius: !active? '8px' : undefined,
  color: active? 'yellow' : 'black',
  transition: '0.5s ease-in-out', 
}

const imgstyle ={
    width: '20px',
    margin: '0 6px',
    transform: active? 'rotate(90deg)': 'rotate(0)',
  };

const info:InfoItem[] = [
    {title: "Message", link: '/main/message'},
    {title: "My Products", link: '/main/products'},
    {title: "Add Product", link: '/main/add'},
    {title: "Sale Jurnale", link: '/main/jurnal'},
    {title: "Log Out", link: '/'},
]


    return(
        <>
       {usermode && 
            <UserInfo active={active}>
            <div onClick={()=>{OpenInfo({link : 'null'})}}  style={styleInfoCont} >
            <img className="user-icon" src={userIcin} alt="User Icon" />
            <samp>
                <span>{localStorage.getItem("user")}</span>
              <span> {localStorage.getItem("address")?.substring(0,15)} </span>
            </samp>
            
            <img style={imgstyle} src={arrow} alt="" />
            </div>
          
          { active &&<> 
            {info.map((item ,index) =>(
                <div 
                    key={index} 
                    onClick={()=>{
                        OpenInfo({link: item.link})
                    }} 
                    className="item">
                        {item.title}
                </div>
            ))
            } </> 
          }
          
          </UserInfo>
          }
                  </>          
    );
}

export default UserElement;