import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./CreateSeries.css";
import { productsContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";

export interface SeriesI {
  title: string;
  description: string;
  price: string;
  category: number;
  video: any;
  id: number;
}
interface CategoryI {
  name: string;
}

const CreateSeries = () => {
  const { getCategories, categories, createSeries } =
    useContext(productsContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SeriesI>();

  const navigate = useNavigate();

  const onSubmit = (data: SeriesI) => {
    const formData: any = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video);
    formData.append("category", data.category.toString());

    createSeries(formData, navigate);
  };

  console.log(categories);

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>Create Product</h3>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              label="Title"
              {...field}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.description}
              helperText={errors.description?.message?.toString()}
              label="Description"
              {...field}
              type="text"
            />
          )}
        />
        <FormControl>
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={field.value}
                label="Category"
                error={!!errors.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  categories.map((category: any, index: number) => (
                    <MenuItem key={index} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          control={control}
          name="video"
          rules={{ required: "Video is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <Button
              component="label"
              color="error"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <Input
                sx={{ display: "none" }}
                {...field}
                className="uploadFile"
                type="file"
                value={value?.fileName}
                onChange={({ target }: any) => onChange(target.files[0])}
              />
            </Button>
          )}
        />
        <Button type="submit" color="error" variant="contained">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default CreateSeries;
