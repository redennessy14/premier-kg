import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import React, { useContext, useEffect } from "react";
import { productsContext } from "../../context/productContext";
import "./CustomCategory.css";

const CustomCategory = () => {
  const { categories, getCategories } = useContext(productsContext);

  useEffect(() => {
    console.log(categories);
    getCategories();
  }, []);
  return (
    <div>
      {categories &&
        categories.map((category: any, index: number) => (
          <div>
            {categories &&
              categories.map((category: any, index: number) => (
                <Card className="category" key={index}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={category.name}
                      height="140"
                      image={category.image}
                    />
                    <CardContent
                      sx={{ backgroundColor: "black", color: "white" }}
                    >
                      <Typography variant="h5" component="div">
                        {category.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </div>
        ))}
    </div>
  );
};

export default CustomCategory;
