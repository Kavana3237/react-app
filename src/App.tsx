import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState<any>({
    name: '',
    email: '',
  });

  useEffect(() => {
    fetchData();
  }, []);


const config={
  headers:{
    mode:'no-cors',
    Credentials:'include'
  }
};

  const fetchData = async () => {
    try {
      const response = await axios.get('/api',config);
      const user = response.data.results[0];
      const { name, email } = user;
      setUserData({ name, email });

      // To Store the data in local storage

      localStorage.setItem('userData', JSON.stringify(user));

      // To Retrieve data from local storage on page load

      const storedData = localStorage.getItem('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }

    } 
    catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return (
    <div className="app">
      <div className='name'>

        <label className='label' >First Name: 
        <input className='input' value={userData.name.first}/>
        </label>
        <label className='label' >Last Name:
        <input className='input' value={userData.name.last}/>
        </label>
        <label className='label' >Email:
          <input className='input' value={userData.email} />
        </label>

      </div>
      <button onClick={refreshData} className='button'>Refresh</button>
    </div>
  );
}

export default App;