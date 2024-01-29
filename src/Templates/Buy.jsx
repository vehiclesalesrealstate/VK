import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Modal, Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Buy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const carrito = location.state?.carrito;
    const [openModal, setOpenModal] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);
    const [carritoLocal, setCarritoLocal] = useState(carrito);

    const calcularTotal = () => {
        if (!carritoLocal || !Array.isArray(carritoLocal)) {
            return 0;
        }
        return carritoLocal.reduce((total, producto) => {
            const precio = parseFloat(producto.precio);
            return total + precio;
        }, 0);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setIndexToDelete(null);
    };
    const handleDelete = (indexToDelete) => {
        if (indexToDelete !== null) {
            const newCarrito = carrito.filter((_, index) => index !== indexToDelete);
            navigate('/', { state: { carrito: newCarrito } });
            setCarritoLocal(newCarrito);
            handleCloseModal();
        }
    };
    const handleOpenModal = (index) => {
        setIndexToDelete(index);
        setOpenModal(true);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            {Array.isArray(carritoLocal) && carritoLocal.map((producto, index) => (
                <Card key={index} style={{ maxWidth: 345, margin: "10px" }}>
                    <CardMedia
                        component="img"
                        alt={producto.name}
                        height="200"
                        image={producto.imageUrl}
                        loading="lazy"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {producto.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {producto.description}
                        </Typography>

                        <IconButton aria-label="delete" onClick={() => handleOpenModal(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmar Eliminación
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Estás seguro de que quieres eliminar este producto?
                    </Typography>
                    <Button onClick={handleDelete}>Eliminar</Button>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                </Box>
            </Modal>
            <div>
                {Array.isArray(carrito) && carrito.map((producto, index) => (
                    <Grid justifyContent="center" alignItems="center">
                        <Card>
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                    Precio: ${producto.precio}
                                </Typography>
                                <Typography variant="h6" style={{ marginTop: "20px" }}>
                                    Total a Pagar: ${calcularTotal()}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Button>
                                    Pagar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </div>
        </Grid>
    );
};

export default Buy;
