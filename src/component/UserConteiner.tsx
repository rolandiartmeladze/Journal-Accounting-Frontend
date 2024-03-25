import React, { useState } from 'react';
import '../style/UserConteiner.css';
import styled from 'styled-components';


import UserIcon from '../icon/addproperties.png';
import AddIcon from '../icon/add.png';
// import CreatNewUser from './CreatNewUser';
// import ChangeAdvenceInfo from './ChangeAdvenceInfo';
import Addnewuser from '../component/Addnewuser';

interface UserContainerProps {
        setUserData: Function;
        setAdvanceData: Function;
        advanceData: object;
        userData: any[];
        Adduser?: any;
        loading: boolean;
        setLoading: Function;
        fetchData: Function;
        findstatus: boolean;
        setFindStatus: Function;
        notfound:boolean;
        setNotound: Function;
        findInput:string;
        setFindInput: Function;    

      }

      const LoadConteiner = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(5.5px);
      bottom: 0;
      top: 55px;
      font-size: 200%;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      z-index: 5;

    `;
    

const AddUserHead = styled.div`
        flex-direction:  column;
        align-items:  center;
        margin-bottom: 15px;
        h3{margin: 0;}
`;


function UserConteiner({
        fetchData, 
        loading, 
        setLoading, 
        userData, 
        setUserData, 
        advanceData, 
        setAdvanceData,
        findstatus,
        setFindStatus,
        notfound,
        setNotound,
        findInput,
        setFindInput
    
  
  
}: UserContainerProps) {

        const [product, setProduct] = useState(false);
        const [updateAdvance, setUpdateAdvance] = useState(false);



        const addProductFunction = () => {
        if(updateAdvance){setUpdateAdvance(false)};
                setProduct(prevProduct => !prevProduct); 
                };


                const closefinde = () => {
                            setFindStatus(false)
                            setNotound(false);
                            fetchData();
                            setFindInput('');

                        }

return (
<>
<div  className='userTable'>
{loading ? <LoadConteiner> {"Loaging..."} </LoadConteiner>:null}

{notfound? <LoadConteiner style={{height: '200px'}} > {" product No found "} <button onClick={closefinde}>close</button></LoadConteiner> : null }


        <Addnewuser updateAdvance={updateAdvance} 
                setUpdateAdvance={setUpdateAdvance}  
                product={product} setProduct={setProduct}  
                addProductFunction={addProductFunction} 
                setUserData={setUserData}  
                advanceData={advanceData} 
                setAdvanceData={setAdvanceData} />

{findstatus? 

<div style={{
        width: '98%',
        marginTop: '10px', 
        display:'flex', 
        justifyContent: 'space-between'
        }}>
       <samp style={{
        margin:'3px', 
        display: 'flex', 
        alignItems: "center", 
        fontSize:'100%', 
        fontWeight: '700', 
        marginLeft: '20px',        
        boxShadow: '0px 2px 2px 0.3px red', 
        padding: '3px'
}}> 
       Found 
       <samp style={{
        color: 'red', 
        margin: '0px 6px', 
        fontSize:'150%', 
        fontWeight: '900'
        }}>{userData.length}</samp> 
       products 
       </samp> 
       <samp onClick={closefinde} className='closeFindeBtn'>Close Finde</samp>
</div>:null
}
        <div onClick={addProductFunction} 
                style={{border: product? '2px rgb(37, 6, 211) solid':'none'}} 
                className='userConteinet'>

                <div style={{justifyContent: 'center'}} 
                        className='userHeaderline'>
                <img src={UserIcon} alt='User Icon' />
                </div>
    
                        <AddUserHead className='userInfoLine'>
                        <h3>Add Product</h3>
                        <img src={AddIcon} alt='User Icon' />
                        </AddUserHead>

        </div>
               
              
                        
        
  

        
      
      
      { 
//       userData.length > 0 ?  
      userData.map((item, index) => (

        <div  key={item._id} className='userConteinet'>

                <div className='userHeaderline'>
                        <img src={UserIcon} alt='User Icon' />
                        <samp>{item.Name} <h3>{item.Address}</h3></samp>
                        <div className='headerMore'>...</div>
                </div>
        
                        <div className='userInfoLine'>
                                <samp><h1>რაოდენობა</h1> <h3>{item.Quantity} {item.Quantityiunit}</h3></samp>
                                <samp><h1>ფასი</h1><h3> {item.Price}  {item.Currency}</h3></samp>
                        </div>
        
                                <div className='userTotal'> 
                                <samp>
                                        <h2>ღირებულება: <samp>{(item.Quantity * item.Price).toFixed(1)} {item.Currency}</samp></h2>
                                </samp>
                                </div>

        </div>
                
      ))
//       :


      // სატესტო მომხმარებელი როდესაც ბაზა ცარიელია

//       <div className='userConteinet'>
      
//       <div className='userHeaderline'>
//         <img src={UserIcon} alt='User Icon' />
//         <samp>Test User 01 <h3>Tsalka</h3></samp>
//             <div className='headerMore'>...</div>
//       </div>
    
//       <div className='userInfoLine'>
//                 <samp><h1>რაოდენობა</h1> <h3>0 ლ.</h3></samp>
//                 <samp><h1>ფასი</h1><h3>0 ₾.</h3></samp>
//       </div>
    
//       <div className='userTotal'> 
//       <samp>
//         <h2>ღირებულება: <samp>0 ₾.</samp></h2>
//       </samp>
//       </div>


//        </div>


      }


      </div>
</>
        );
}

export default UserConteiner;
