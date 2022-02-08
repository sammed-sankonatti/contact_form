import { useState } from 'react';
import './App.css';
import Axios from 'axios'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
// const {db} = require('./localDb')
import M from 'materialize-css'

function App() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [localdb, setLocalDb] = useState(false);
  const [database, setDatabase] = useState(false);

  const options = [
    "localdb",
    "database"
  ]
  const defaultOption = options[0];

  const handleFormSubmission = (e)=>{
    e.preventDefault()
    const userDetails ={
      firstname, lastname, email, phone, zipcode
    }
    var phoneno = /^\d{10}$/;
    if(!phone.match(phoneno)){
      return M.toast({html: "phone number invalid",classes:"#c62828 blue darken-3"})
    }
    var pincode = /^[1-9][0-9]{5}$/;
    if(!zipcode.match(pincode)){
      return M.toast({html: "invalid zipcode",classes:"#c62828 blue darken-3"})
    }
    if(database){
      Axios.post('http://localhost:5000/savetodb', {...userDetails, database}).then(res=>{
      // console.log(res);
      setDatabase(false)
      M.toast({html: res.data.message ,classes:"#c62828 green darken-3"})
    })
    } else if(localdb){
      Axios.post('http://localhost:5000/savetolocaldb', {...userDetails, localdb}).then(res=>{
      console.log(res);
      setLocalDb(false)
      M.toast({html: res.data.message ,classes:"#c62828 green darken-3"})
    })
    } else{
      M.toast({html: "Please choose a Db",classes:"#c62828 blue darken-3"})
    }
    
  }

  const handleStorage = async (e) =>{
    if(e.value == "localdb"){
      // console.log(localdb);
      await setLocalDb(true)
      M.toast({html: "local storage choosen",classes:"#c62828 green darken-3"})
    }else{
      await setDatabase(true)
      M.toast({html: "database is choosen",classes:"#c62828 green darken-3"})
    }
  }

  const checkLocalStorage = ()=>{
    
  }

  return (

    <div className="app">
      <h2> Contact Form</h2>
      {/* <div className='container'> */}
        <div className="user_details">
        <label>firstName :</label>
        <input
          className="input_label" 
          type = "text" 
          value={firstname} 
          onChange={(e)=>setFirstName(e.target.value)}  
          placeholder="Enter firstName" 
        />
        </div>
        <div className="user_details">
        <label>lastName :</label>
        <input
          className="input_label" 
          type = "text" 
          value={lastname} 
          onChange={(e)=>setLastName(e.target.value)} 
          placeholder="Enter lastName" 
        />
        </div>

        <div className="user_details">
        <label>Email :</label>
        <input
          className="input_label" 
          type = "email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Enter Email" 
        />
        </div>
       

        <div className="user_details">
        <label> Phone :</label>
        <input
          className="input_label" 
          type = "number" 
          value={phone} 
          onChange={(e)=>setPhone(e.target.value)}  
          placeholder="Enter mobile No" 
        />
        </div>
        

        <div className="user_details">
        <label>Zip code :</label>
        <input
          className="input_label" 
          type = "number" 
          value={zipcode} 
          onChange={(e)=>setZipcode(e.target.value)} 
          placeholder="Enter zip code" 
        />
        </div>
        {/* </div> */}
        <Dropdown options={options} onChange={handleStorage}  value={defaultOption} placeholder="Select an option" />
        <button className='button' onClick={handleFormSubmission}> Submit</button>
      {/* <button className='button' onClick={checkLocalStorage}> check local Db</button> */}
    </div>     
  );
}

export default App;
