import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { authContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignIn.css";

interface SignInI {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();
  const navigate = useNavigate();

  const { handleSignIn } = useContext(authContext);

  const onSubmit = (data: any) => {
    handleSignIn(data, navigate);
    toast.success("Вы успешно вошли в аккаунт");
  };

  return (
    <div className="sign-in" style={{ width: "50%", margin: "0 auto" }}>
      <h2>Войти в аккаунт</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email пустой" }}
          render={({ field }) => (
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
              label="Email"
              {...register("email", {
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Entered value does not match email format",
                },
              })}
              {...field}
              // sx={{ height: "40px" }}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Пароль пустой" }}
          render={({ field }) => (
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              label="Пароль"
              {...field}
              // sx={{ height: "40px" }}
              type="password"
            />
          )}
        />
        <div>
          <p>
            У вас еще нету аккаунта ? <Link to="/sign-up">Регистрация</Link>
          </p>
        </div>
        <Button type="submit" color="error" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
