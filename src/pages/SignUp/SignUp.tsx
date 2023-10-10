import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
  } = useForm();
  const pwd = watch("password");
  //   const { handleSignUp } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // /sign-up
    // handleSignUp(data, navigate);
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h2>Sign up</h2>
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
          rules={{ required: "Email is required" }}
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
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              label="Password"
              {...field}
              // sx={{ height: "40px" }}
              type="password"
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          rules={{
            required: "Password is required",
            validate: (value) => value === pwd || "The passwords don't match",
          }}
          render={({ field }) => (
            <TextField
              error={!!errors.password_confirm}
              helperText={errors.password_confirm?.message?.toString()}
              label="Confirm password"
              {...field}
              // sx={{ height: "40px" }}
              type="password"
            />
          )}
        />
        <div>
          <p>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </div>

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
