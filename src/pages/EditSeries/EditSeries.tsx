import React, { useContext, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { productsContext } from "../../context/productContext";
import { useNavigate, useParams } from "react-router-dom";
import { SeriesI } from "../CreateSeries/CreateSeries";
import { toast } from "react-toastify";

const EditSeries = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SeriesI>();

  const {
    getCategories,
    categories,
    createSeries,
    series,
    getSeriesById,
    oneSeries,
    editSeries,
  } = useContext(productsContext);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    getSeriesById(id as string);
  }, []);
  console.clear();
  console.log(oneSeries, "ssssseruis");
  console.log(id, "id");

  const handleEdit = async (data: SeriesI) => {
    const formData: any = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video);
    formData.append("category", data.category.toString());
    await editSeries(formData, id);

    toast.success(`Сериал  изменен`);

    navigate("/series");
  };

  if (!oneSeries) {
    return <h1 style={{ color: "white" }}>"Loading..."</h1>;
  }
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>Edit Series</h3>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSubmit(handleEdit)}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              defaultValue={oneSeries.title}
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
              defaultValue={oneSeries.description}
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
                    <MenuItem
                      defaultValue={oneSeries.categories}
                      key={index}
                      value={category.name}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>
        {/* <Controller
          control={control}
          name="video"
          rules={{ required: "Video is required" }}
          render={({ field }) => (
            <TextField
              defaultValue={oneSeries.video}
              error={!!errors.video}
              helperText={errors.video?.message?.toString()}
              label="Video"
              {...field}
              type="video/mp4"
            />
          )}
        /> */}
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
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default EditSeries;
