import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { productsContext } from "../../context/productContext";
import "./CreateCategory.css";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
  color: "white",
};

const CreateCategory = () => {
  const {
    createCategory,
    getCategories,
    categories,
    deleteCategory,
    editCategory,
    oneCategory,
    getCategoryByName,
  } = useContext(productsContext);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [formValues, setFormValues] = React.useState({ name: "" }); // Обновлено здесь

  const onSubmit = (data: any) => {
    console.log(data, "dadadada");
    createCategory(data);
    getCategories();
  };

  useEffect(() => {
    getCategories();
    // getCategoryByName();
  }, []);

  const navigate = useNavigate();

  const onDeleteCategory = async (name: string) => {
    await deleteCategory(name);
    await getCategories();
  };

  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = (initialValue: any) => {
  //     setFormValues({ name: initialValue }); // Обновлено здесь
  //     setOpen(true);
  //   };
  //   const handleClose = () => setOpen(false);

  //   const handleModalSubmit = (data: any) => {
  //     handleEditCategory(data.name);
  //     handleClose();
  //   };

  //   const handleEditCategory = async (name: any) => {
  //     await editCategory(oneCategory, name);
  //   };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        color: "white",
      }}
    >
      <h3>Создать категорию </h3>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Название категории пусто" }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              label="Название категории"
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
          Создать
        </Button>
      </form>
      <div>
        <h3> Список категории </h3>
        {categories &&
          categories.map((category: any, index: number) => (
            <div className="category_card" key={index}>
              {category.name}
              <div>
                {" "}
                <Button>
                  <DeleteOutlineIcon
                    color="error"
                    onClick={() => onDeleteCategory(category.name)}
                  />
                </Button>
                {/* <Button onClick={() => handleOpen(category.name)}>
                  <EditIcon />
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Редактировать категорию
                    </Typography>
                    <form
                      style={{ display: "flex", flexDirection: "column" }}
                      onSubmit={handleSubmit(handleModalSubmit)}
                    >
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Название категории пусто" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ margin: "50px 0 " }}
                            error={!!errors.name}
                            helperText={errors.name?.message?.toString()}
                            label="Название категории"
                            type="text"
                          />
                        )}
                      />
                      <Button type="submit" color="error" variant="contained">
                        Сохранить
                      </Button>
                    </form>
                  </Box>
                </Modal> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreateCategory;
