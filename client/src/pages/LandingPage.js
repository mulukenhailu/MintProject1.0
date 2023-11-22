import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { bounce } from "react-animations";

import animationData from "../assets/Animation.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Anchor = styled.a`
  text-decoration: none;
`;
const Main = styled.div`
  margin-bottom: 3rem;
  padding: 2rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;
const Hero = styled.section`
  color: #333333;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 1.2rem;
    padding: 1.5rem;
  }

  @media (max-width: 992px) {
    font-size: 1rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  @media (max-width: 576px) {
    font-size: 0.6rem;
    padding: 0.3rem;
  }
`;
const StyledButton = styled(Button)`
  && {
    /* margin: 2rem; */

    @media (max-width: 1200px) {
      margin: 3rem;
    }

    @media (max-width: 992px) {
      margin: 2rem;
    }

    @media (max-width: 768px) {
      margin: 1rem;
    }

    @media (max-width: 576px) {
      margin: 0.5rem;
    }
  }
`;
const Bounce = styled.h1`
  padding: 0.1rem;
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

function LandingPage() {
  return (
    <Container>
      <Header>
        <Anchor href="https://mint.gov.et">
          <img
            src="/assets/mint.jpeg"
            alt="Ministry of Innovation and Technology"
          />
        </Anchor>
      </Header>
      <div style={{ marginTop: "40px" }}>
        <h1 style={{ color: "gray" }}>Welcome to MinT Store</h1>
      </div>
      <Main>
        <div style={{ width: "25%" }}>
          <Lottie animationData={animationData} />
        </div>{" "}
        <Hero>
          {/*<Bounce>This is the ministry's store management system</Bounce>*/}

          <div>
            <Link to="/login">
              <StyledButton
                variant="contained"
                sx={{
                  background: "#12596b",
                  "&:hover": { background: "#0f4f5f" },
                }}
              >
                Get Started
              </StyledButton>
            </Link>
          </div>
        </Hero>
      </Main>
    </Container>
  );
}

export default LandingPage;
