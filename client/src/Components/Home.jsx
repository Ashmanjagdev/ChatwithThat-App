import React,{useState} from 'react';
import {useNavigate,NavLink} from "react-router-dom";


const Home = () => {

const navigate = useNavigate();
const [errors,seterrors]= useState("");

const [user,setUser] = useState({
    username:"",password:""
    });
  
    let name, value;
  
    const handleInputs = (e) => {
    name= e.target.name;
    value = e.target.value;
  
    setUser({...user,[name]:value})
    }

const checkValues= async (e) => {
   e.preventDefault();
        const { username,password } = user;
	  const res= await fetch("/signin",{
		method: "POST",
		headers: {
		  "Content-Type" : "application/json"
		},
		body:JSON.stringify({
		  username,password
		})
	  });
    const data= await res.json();
    console.log(data);
     if(res.status===391){
      seterrors("Wrong Password");
     }
     else if(res.status===200){
      console.log("successfully login");
      navigate("/chats");
     }
     else if(res.status===393){
      seterrors("Wrong email address");
     }
     else{
      seterrors("Wrong Input");
     }
  
}

  return (
    <>
	<div className="signform">
<div className="cont log">
    <div className="title">Log In </div>
    <br />
    <div className="content">
    <span className="details" style={{color:"red"}}>{errors}</span>
      <form method="POST" onSubmit={checkValues}>
        <div className="user-detail">
          
          <div className="input-box">
            <span className="details">Email</span>
            <input name="username" value={user.username} id="name" onChange={handleInputs}  type="text" placeholder="Enter your email" required />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input name="password" value={user.password} onChange={handleInputs} type="password" placeholder="Enter your password" required />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Log In" />
        </div>
        <div >
          <NavLink className="createacc" to="/signup"><b>Create Account</b></NavLink>
        </div>
      </form>

    </div>
  </div>
</div>
</>
  );
}

export default Home;