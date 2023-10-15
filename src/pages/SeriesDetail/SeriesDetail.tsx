import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsContext } from "../../context/productContext";
import { SeriesI } from "../CreateSeries/CreateSeries";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import "./SeriesDetail.css";

const SeriesDetail = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { id } = useParams();
  const { getSeriesById, oneSeries, addComment } = useContext(productsContext);
  //   const { addBasket } = useContext(productsContext);
  console.log(oneSeries, "series");

  useEffect(() => {
    getSeriesById(id);
  }, []);
  return (
    <div style={{ color: "white" }}>
      <video controls className="detail__video">
        <source src={oneSeries.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div>Название {oneSeries.title}</div>

      <div>Описание {oneSeries.description}</div>
      <div>Просмотры {oneSeries.count_views}</div>
      <div>Лайки {oneSeries.like_count}</div>
      <div>Рейтинг {oneSeries.rating}</div>
      <div>Коментарии {oneSeries.comments}</div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(addComment)}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Название категории пусто" }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              label="Коментарии"
              {...field}
              type="text"
            />
          )}
        />
        <Button
          type="submit"
          color="error"
          variant="contained"
          sx={{ margin: "50px 0 " }}
        >
          Отправить коментарии
        </Button>
      </form>
    </div>
  );
};

export default SeriesDetail;
