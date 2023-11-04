import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Workspace = () => {
  const navigator = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigator("/login")
    }
  }, [])

  return <div>Workspace</div>;
};

export default Workspace;
