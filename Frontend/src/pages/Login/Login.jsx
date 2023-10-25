import RightDesign from "../../components/RightDesign";
import logo from "../../images/Logo.png"
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setLogin((prev)=>{
      return {...prev, [name]: value}
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    alert(login.email + " "+ login.password)
  }
  return (
    <div className="flex text-white relative" id="login">
      <div className="h-full bg-[#1e1f25] w-[45vw] p-4">
        <div className="logo">
          <img src={logo} alt="Pushnote Logo"/>
        </div>
        <div className="text-[#ffe3e2] px-24 py-24">
          <h6 className="text-xl">Sign in</h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              className=" bg-transparent border-[#ffe3e2] border rounded-sm p-4 my-3 placeholder:text-[#ffe3e2]"
              placeholder="Email Address*"
              onChange={handleChange}
              name="email"
              value={login.email}
              required
            />
            <input
              type="password"
              className=" bg-transparent border-[#ffe3e2] border rounded-sm p-4 my-3 placeholder:text-[#ffe3e2]"
              placeholder="Password*"
              onChange={handleChange}
              name="password"
              value={login.password}
              required
            />
            <div className="flex justify-between my-3">
              <button className="p-2 text-[#dee9ff] bg-blue-700 rounded-md" type="submit">
                Login
                <FontAwesomeIcon icon={faArrowRight} className="mx-2"/>
              </button>
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
            <button className="p-2 my-5 bg-blue-700 rounded-md text-[#dee9ff]">Create an Account</button>
          </form>
        </div>
      </div>
      <RightDesign />
    </div>
  );
}

export default Login
