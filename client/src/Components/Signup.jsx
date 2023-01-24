import React,{useState} from 'react';
import {useNavigate,NavLink} from 'react-router-dom';
import Axios from 'axios';

const Signup = () => {

const navigate = useNavigate(); 

const [user,setUser] = useState({
	name:"",username:"",password:"",confirmpassword:""
  });
  const [errors,seterrors]= useState("");

  let name, value;

  const handleInputs = (e) => {
	name= e.target.name;
	value = e.target.value;

	setUser({...user,[name]:value})
  }

	const PostData = async (e) =>{
	  e.preventDefault();

	  const { name,username,password,confirmpassword } = user;
	  const res= await fetch("/signup",{
		method: "POST",
		headers: {
		  "Content-Type" : "application/json"
		},
		body:JSON.stringify({
		  name,username,password,confirmpassword
		})
	  });
    const data= await res.json();
    console.log(data);
     if(res.status===391){
      seterrors("passwords are not matching");
     }
     else if(res.status===200){
      console.log("successfully created account");
      navigate("/chats");
     }
     else if(res.status===392){
      seterrors("email already exist");
     }
     else{
      seterrors("Wrong Input");
     }


	}

  return (<>
<div className="signform signup">
<div className="cont cont-signup" >
    <div className="title">Registration</div>
    <div className="content">
    <span className="details" style={{color:"red"}}>{errors}</span>
      <form method="POST" onSubmit={PostData}>
       
        <div className="user-details">
          <div className="input-box">
            <span className="details">Name</span>
            <input name="name" type="text" value={user.name} onChange={handleInputs} placeholder="Enter your name" required />
          </div>
          <div className="input-box">
            <span  className="details">Email</span>
            <input name="username" type="text" value={user.email} onChange={handleInputs} placeholder="Enter your email" required />
          </div>
          <div className="input-box">
            <span className="details">Password </span>
            <input name="password"  type="password" value={user.password} onChange={handleInputs} placeholder="Enter your password " required />
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input name="confirmpassword"  type="password" value={user.confirmpassword} onChange={handleInputs} placeholder="Confirm your password" required />
         </div>
          
        </div>

        <div className="button">
          <input type="submit" value="Register" />
        </div>
        <div className="closing">Already have an account?
		<NavLink className="createacc" to="/"><b>Log In</b></NavLink>
        </div>
      </form>
    </div>
  </div>
</div>
	</>
  )
}

export default Signup;