import React, {useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import ProductsConteiner from './component/ProductsConteiner/ProductsConteiner';
import Aside from './component/Aside';


function App(): JSX.Element{
  
  // const serverUrl = "https://limitless-tor-40344-c89ae9237437.herokuapp.com";
  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";


  const [loading, setLoading] = useState<boolean>(false);
  const [findstatus, setFindStatus] = useState<boolean>(false);
  const [notfound, setNotound] = useState<boolean>(false);
  const [findInput, setFindInput] = useState<string>('');

  // const [userResponse, setUserData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
    const [advanceData, setAdvanceData] = useState<any[]>([]);

      // როდესაც ჩაიტვირთრბა app.js აგზავნის მოთხოვნას GET მონაცემთა ბაზაში 
      // ამოწმებს შედეგს და ანიჭებს მიღებულ მონაცემებს dataResponse ცვლადს
      // რაც აისახება რეალურ გარემოში
      const fetchData = async () => {
        setLoading(true);
        try {

          const usersResponse = await fetch(`${serverUrl}/checkProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
            if (!usersResponse.ok) {throw new Error('Failed to fetch users data');}
            const usersData = await usersResponse.json();
            setUserData(usersData);
      
        const advanceResponse = await fetch(`${serverUrl}/checkAdvance`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });
            if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
            const advanceData = await advanceResponse.json();
            setAdvanceData(advanceData[0]);
          setLoading(false)
      } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

          useEffect(() => {
            fetchData();
          }, []); 
  
  return (
    <>

<Header />
<Aside 
    userData={userData} 
    setUserData={setUserData} 
    loading={loading}
    setLoading={setLoading}
    findstatus={findstatus}
    setFindStatus={setFindStatus}
    notfound={notfound}
    setNotound={setNotound}
    findInput={findInput}
    setFindInput={setFindInput}

/>



  <ProductsConteiner 
      findInput={findInput}
      setFindInput={setFindInput}
  
      fetchData={fetchData}
      loading={loading}
      setLoading={setLoading}

      findstatus={findstatus}
      setFindStatus={setFindStatus}

      notfound={notfound}
      setNotound={setNotound}

    userData={userData} 
    setUserData={setUserData} 
    advanceData={advanceData}
    setAdvanceData={setAdvanceData}
  />


      </>

  );
}

export default App;
