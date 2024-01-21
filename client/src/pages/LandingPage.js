import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const navigate = useNavigate();

  const [isBelowLargeScreen, setIsBelowLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowLargeScreen(window.innerWidth <= 1201);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const textVariants = {
    initial: {
      x: isBelowLargeScreen ? 0 : -300,
      opacity: 0,
    },
    animate: {
      x: isBelowLargeScreen ? 0 : -100,
      opacity: 1,
      transition: isBelowLargeScreen
        ? {}
        : {
            duration: 1,
            staggerChildren: 0.5,
          },
    },
  };

  const sliderVariant = {
    initial: {
      x: isBelowLargeScreen ? 0 : 1000,
    },
    animate: {
      x: isBelowLargeScreen ? 0 : "-308%",
      transition: isBelowLargeScreen
        ? {}
        : {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
          },
    },
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "white",
        position: "relative",
      }}
    >
      {isBelowLargeScreen ? (
        <div
          style={{
            width: "94%",
            height: "20vh",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              whiteSpace: "normal",
              color: "#12596b",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Ministry of Innovation and Technology Inventory Management System
          </h1>
        </div>
      ) : (
        <motion.div
          style={{
            fontSize: "20vh",
            whiteSpace: "nowrap",
            color: "#12596b",
            fontWeight: "bold",
            width: "100%",
            margin: "0px",
            padding: "0px",
          }}
          variants={sliderVariant}
          initial="initial"
          animate="animate"
        >
          Ministry of Innovation and Technology Inventory Management System
        </motion.div>
      )}

      <div
        style={{
          width: "100%",
          height: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 0px 50px 0px",
        }}
      >
        {isBelowLargeScreen ? (
          <div
            style={{
              padding: "30px",
              height: "70vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ height: "70%" }}>
                <img
                  src="./assets/mint.png"
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "20px",
                  border: "2px solid #12596b",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  color: "#12596b",
                  cursor: "pointer",
                  fontWeight: 300,
                  fontSize: "24px",
                  marginTop: "30px",
                  textAlign: "center",
                }}
                variants={textVariants}
                onClick={() => navigate("/login")}
              >
                Get started
              </div>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              style={{
                flex: "2",
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <img
                src="./assets/mint.png"
                alt=""
                style={{
                  height: "100%",
                  objectFit: "fill",
                  borderRadius: "5px",
                }}
              />
            </motion.div>
            <motion.div
              style={{
                flex: "1",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <motion.button
                style={{
                  padding: "20px",
                  border: "2px solid #12596b",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  color: "#12596b",
                  cursor: "pointer",
                  fontWeight: 300,
                  fontSize: "24px",
                  width: "300px",
                }}
                variants={textVariants}
                onClick={() => navigate("/login")}
              >
                Get started
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
