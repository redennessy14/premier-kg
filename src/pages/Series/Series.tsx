import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../context/productContext";
import { log } from "console";
import { SeriesI } from "../CreateSeries/CreateSeries";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Series = () => {
  const { getSeries, series, deleteSeries } = useContext(productsContext);

  useEffect(() => {
    getSeries();
  }, []);

  const [currentUser, setCurrentUser] = useState<string | null>("");
  const isAdmin = currentUser === "ralz9-ralz9@mail.ru";
  useEffect(() => {
    const user = localStorage.getItem("email");
    setCurrentUser(user);
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/edit-series/${id}`);
  };

  const onDeleteHandler = async (id: number) => {
    await deleteSeries(id);
    await getSeries();
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
            <Card
              style={{
                width: "30%",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <CardMedia
                sx={{ maxHeight: "300px" }}
                component="video"
                controls // Добавляем controls для управления видео (play, pause, etc.)
                // autoPlay // Добавляем autoPlay для автоматического воспроизведения
                loop // Добавляем loop для повторного воспроизведения видео
                muted // Добавляем muted для отключения звука
                src={series.video}
                title="Video title"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {series.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "white" }}
                  color="text.secondary"
                >
                  {series.description}
                </Typography>
              </CardContent>
              <CardActions>
                {isAdmin && (
                  <>
                    <Button onClick={() => onDeleteHandler(series.id)}>
                      <DeleteOutlineIcon color="error" />
                    </Button>
                    <Button onClick={() => handleEdit(series.id)}>
                      <EditIcon />
                    </Button>
                  </>
                )}
                <Button onClick={() => navigate(`/series-detail/${series.id}`)}>
                  <InfoOutlinedIcon color="primary" />
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
