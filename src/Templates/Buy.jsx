import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Modal, Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Buy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [carritoLocal, setCarritoLocal] = useState(() => {
        const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoPasado = location.state?.carrito?.[0];

        if (productoPasado) {
            const yaEnCarrito = carritoData.some(producto => producto.id === productoPasado.id);
            if (!yaEnCarrito) {
                carritoData.push(productoPasado);
                localStorage.setItem('carrito', JSON.stringify(carritoData)); // Actualiza localStorage con el nuevo carrito
            }
        }

        return carritoData;
    });

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
        setProductoAEliminar(null);
    };

    const handleDelete = () => {
        const carritoActualizado = carritoLocal.filter(producto => producto.id !== productoAEliminar);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
        setCarritoLocal(carritoActualizado);
        handleCloseModal();
    };


    const handleOpenModal = (productoId) => {
        setProductoAEliminar(productoId);
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
            {carritoLocal.map((producto, index) => (
                <Card key={producto.id || index} style={{ maxWidth: 345, margin: "10px" }}>
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

                        <IconButton aria-label="delete" onClick={() => handleOpenModal(producto.id)}>
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

                <Grid justifyContent="center" alignItems="center">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" style={{ marginTop: "20px" }}>
                                Total a Pagar: ${calcularTotal()}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Button onClick={() => navigate('/checkout')}>
                                Pagar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </Grid>
    );
};

export default Buy;
