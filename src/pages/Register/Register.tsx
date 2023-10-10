import React from "react";
import "./Register.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register">
      <div className="fadeInFromBottom">
        <p>Фильмы, сериалы и многое другое без ограничений</p>
      </div>
      <div className="register_btn">
        <Button
          onClick={() => navigate("/sign-up")}
          variant="contained"
          size="large"
          color="success"
          className="button-animation"
        >
          Регистрация
        </Button>
        <Button
          onClick={() => navigate("/sign-in")}
          variant="contained"
          size="large"
          color="success"
          className="button-animation"
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Register;
