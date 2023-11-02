import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const Authentication = () => {
  const [alreadyUser, setAlreadyUser] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workSpaceName: "",
    number: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signUp } = useSignup();
  const { login } = useLogin();

  const toggleForm = () => {
    setAlreadyUser(!alreadyUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, workSpaceName, number, email, password } =
      formData;

    if (alreadyUser) {
      await login({ email, password }); // If alreadyUser is true, call login.
      navigate("/workspace");
    } else {
      await signUp({
        firstName,
        lastName,
        workSpaceName,
        number,
        email,
        password,
      }); // If alreadyUser is false, call signUp.
      navigate("/workspace");
    }
  };

  return (
    <form>
      <h4>{alreadyUser ? "Login" : "Signup"}</h4>
      {!alreadyUser ? (
        <>
          <input
            type="text"
            placeholder="First Name*"
            value={formData.firstName}
            onChange={(event) =>
              setFormData({ ...formData, firstName: event.target.value })
            }
          />

          <input
            type="text"
            placeholder="Last Name*"
            value={formData.lastName}
            onChange={(event) =>
              setFormData({ ...formData, lastName: event.target.value })
            }
          />

          <input
            type="text"
            placeholder="Workspace Name*"
            value={formData.workSpaceName}
            onChange={(event) =>
              setFormData({ ...formData, workSpaceName: event.target.value })
            }
          />

          <input
            type="text"
            placeholder="Contact Number*"
            value={formData.number}
            onChange={(event) =>
              setFormData({ ...formData, number: event.target.value })
            }
          />
        </>
      ) : null}

      <input
        type="email"
        placeholder="Email*"
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password*"
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <button onClick={handleSubmit}>
        {alreadyUser ? "Login" : "Signup"}
        <HiArrowRight />
      </button>
      <p>
        {alreadyUser ? "Not Have An Account?" : "Already Have An Account?"}
        <a href="#" onClick={toggleForm}>
          {alreadyUser ? "Sign Up" : "Login"}
        </a>
      </p>
    </form>
  );
};

export default Authentication;
