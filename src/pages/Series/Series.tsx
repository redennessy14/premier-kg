import React, { useContext, useEffect } from "react";
import { productsContext } from "../../context/productContext";
import { log } from "console";
import { SeriesI } from "../CreateSeries/CreateSeries";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const Series = () => {
  const { getSeries, series, deleteSeries } = useContext(productsContext);
  useEffect(() => {
    getSeries();
  }, []);

  console.log(series, "series");

  const onDeleteHandler = (id: number) => {
    deleteSeries(id);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {series.length > 0 ? (
          series.map((series: SeriesI) => (
            <Card style={{ width: "30%" }}>
              <CardMedia
                component="video"
                controls // Добавляем controls для управления видео (play, pause, etc.)
                autoPlay // Добавляем autoPlay для автоматического воспроизведения
                loop // Добавляем loop для повторного воспроизведения видео
                muted // Добавляем muted для отключения звука
                src={series.video}
                title="Video title"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {series.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {series.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onDeleteHandler(series.id)}>
                  <DeleteOutlineIcon color="error" />
                </Button>
                <Button>
                  <EditIcon />
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <h2> Products not found ... </h2>
        )}
      </div>
    </div>
  );
};

export default Series;
