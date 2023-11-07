import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { removeUserError } from "../State/ReduxToolkit/Slices/userSlice";

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
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 350px;
  max-width: 80%;
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

const LoadingComponent = styled.div`
  text-align: center;
`;

const ErrorComponent = styled.div`
  background: red;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 10px;
  justify-content: flex-start;
  height: 35px;
  overflow: hidden;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 10%;
    width: 100%;
    background: white;
    animation: decreaseWidth 4s forwards;
  }

  @keyframes decreaseWidth {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
const ErrorComponentBottom = styled.div``;

function LoginPage() {
  const { loadingUser, errorUser } = useSelector((state) => state.user);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    setSubmitClicked(false);
    dispatch(removeUserError());
  }, [dispatch]);

  useEffect(() => {
    if (errorUser) {
      setSubmitClicked(false);
      setTimeout(() => {
        dispatch(removeUserError());
      }, 5000);
    }
  }, [errorUser]);

  const [credentials, setCredentials] = useState({
    user_name: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_USER, credentials });
    setSubmitClicked(true);
  };

  if (submitClicked && !loadingUser && !errorUser) {
    navigate("/home");
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Typography
          align="center"
          variant="h4"
          fontWeight={400}
          marginBottom={3}
          sx={{ color: "gray" }}
        >
          LOGIN
        </Typography>
        {errorUser && (
          <ErrorComponent>
            <Typography>{errorUser}</Typography>
          </ErrorComponent>
        )}
        {loadingUser && (
          <LoadingComponent>
            <ClipLoader
              color={"#36d7b7"}
              loading={loadingUser}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </LoadingComponent>
        )}

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
      </Form>
    </Container>
  );
}

export default LoginPage;
