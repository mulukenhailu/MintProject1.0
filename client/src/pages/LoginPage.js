import React, { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_USER } from "../State/ReduxSaga/Types/userTypes";
import { useDispatch,useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px 20px 60px 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 350px;
  max-width: 80%;
`;

const Direction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.5rem 0;
`;

const TextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 0;
  transition: ease-in-out 0.3s;
`;

const ButtonStyled = styled(Button)`
  && {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const EyeSpan = styled.span`
  position: absolute;
  top: 75%;
  right: 5%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #918981;
  font-size: 20px;
  transform: translateY(-50%);
`;

const ErrorComponent = styled.div`
  background: red;
  color: white;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  justify-content: flex-start;
`;

function LoginPage() {
  const {user,loadingUser,errorUser} =useSelector((state)=>state.user)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    setSubmitClicked(false);
  }, [dispatch]);

  const [credentials, setCredentials] = useState({
    user_name: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({type:LOGIN_USER, credentials})
    setSubmitClicked(true);
  };
  
  if (submitClicked && !loadingUser && !errorUser) {
    navigate("/home");
  }

  console.log(document.cookie);

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Typography align="center" variant="h4" fontWeight={400}>
          LOGIN
        </Typography>
        {/* <ErrorComponent>
          <Typography>Wrong password</Typography>
        </ErrorComponent> */}

        <TextFieldWrapper>
          <TextField
            required
            id="standard-username-input"
            label="Username"
            type="text"
            variant="standard"
            value={credentials.user_name}
            onChange={(e) =>
              setCredentials({ ...credentials, user_name: e.target.value })
            }
          />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type={passwordVisible ? "text" : "password"}
            variant="standard"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <EyeSpan>
            {passwordVisible ? (
              <VisibilityIcon
                size={24}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                size={24}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            )}
          </EyeSpan>
        </TextFieldWrapper>
        <ButtonStyled type="submit">Login</ButtonStyled>
        <Link
          style={{
            textDecoration: "none",
            textAlign: "right",
            marginTop: "15px",
            color: "#007bff",
          }}
          to="/forgetpassword"
        >
          Forget password?
        </Link>
      </Form>
    </Container>
  );
}

export default LoginPage;
