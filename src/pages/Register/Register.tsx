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
          color="error"
          className="button-animation"
        >
          Регистрация
        </Button>
        <Button
          onClick={() => navigate("/sign-in")}
          variant="contained"
          size="large"
          color="error"
          className="button-animation"
        >
          Войти
        </Button>
      </div>
      <img
        className="iron_man"
        src="https://freepngimg.com/save/152461-man-infinity-avengers-iron-war/3000x3000"
        alt=""
      />
      <img
        className="superman"
        src="https://clipart.info/images/ccovers/1516943360Superman-transparent-background.png"
        alt=""
      />
      {/* 
      <img
        className="spiderman"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b8d2b12-21e8-4931-8a6d-fb9ecdd60383/deonnlm-d1d46867-2700-4d3c-a005-3a8f26809e6f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViOGQyYjEyLTIxZTgtNDkzMS04YTZkLWZiOWVjZGQ2MDM4M1wvZGVvbm5sbS1kMWQ0Njg2Ny0yNzAwLTRkM2MtYTAwNS0zYThmMjY4MDllNmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8XOmwaSNkDGtcsCpuicBXCjb0M8jiyXQTMMuqJu1p70"
        alt=""
      /> */}
    </div>
  );
};

export default Register;
