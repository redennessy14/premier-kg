import { Button, TextField, makeStyles } from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "./SignUp.css";

import { authContext } from "../../context/authContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
  } = useForm();
  const pwd = watch("password");
  const { handleSignUp } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);

    handleSignUp(data, navigate);
    toast.success(" Потвердите почту !");
  };

  return (
    <div className="sign-up" style={{ width: "50%", margin: "0 auto" }}>
      <h2>Регистрация</h2>
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
          rules={{ required: "Email пустой " }}
          render={({ field }) => (
            <TextField
              sx={{
                "&:placeholder": {
                  color: "pri",
                },
              }}
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

        <Controller
          control={control}
          name="password2"
          rules={{
            required: "Повтор пароля пустой",
            validate: (value) => value === pwd || "The passwords don't match",
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              error={!!errors.password_confirm}
              helperText={errors.password_confirm?.message?.toString()}
              label="Повторите пароль"
              {...field}
              // sx={{ height: "40px" }}
              type="password"
            />
          )}
        />
        <div>
          <p>
            У вас уже есть аккаунт ? <Link to="/sign-in">Войти </Link>
          </p>
        </div>

        <Button type="submit" variant="contained" color="error">
          Создать Аккаунт{" "}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
