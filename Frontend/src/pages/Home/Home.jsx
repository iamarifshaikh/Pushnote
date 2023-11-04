import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/workspace")
    }
  }, [])
  return <div>Home</div>;
};

export default Home;
