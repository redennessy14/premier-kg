import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { productsContext } from "../../context/productContext";

const CreateCategory = () => {
  const { createCategory } = useContext(productsContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    createCategory(data);
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>Create category</h3>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              label="Category name"
              {...field}
              type="text"
            />
          )}
        />
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
