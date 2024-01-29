import React, { useState } from "react";
import Box from "@mui/joy/Box";
import {
    Card,
    Grid,
    Select,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "firebase/storage";
import CardContent from "@mui/joy/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { useAuth } from '../routes/AuthContext';

const styles = {

    container: {
        padding: "10px",
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
    },
    columnContainer: {
        textAlign: "center",
    },
    rowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardContainer: {
        marginTop: "20px",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",

    },
};


const Cards = ({ producto }) => {


    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { description, imageUrl, name, precio } = producto;

    const handleAddToCartClick = (producto) => {

        if (isAuthenticated) {
            navigate('/buy', { state: { carrito: [producto] } });

        } else {
            navigate('/signup');
        }
    };
    return (
        <Grid item padding="5px">
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    alt={`imageUrl`}
                    height="200"
                    image={imageUrl}
                    loading="lazy"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                            alignItems: "center",
                            padding: "10px",
                        }}
                    >
                        <Typography color="text.secondary">Precio: ${precio}</Typography>


                        <IconButton aria-label="carrito de compras" onClick={() => handleAddToCartClick(producto)}>
                            <ShoppingCartIcon />
                        </IconButton>

                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default function CardLayers3d({ searchTerm, imageUrls: propImageUrls }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedBrand, setSelectedBrand] = React.useState("Daytona");
    const [selectedCilinder, setSelectedCilinder] = React.useState("CC150");


    const handleBrandChange = async (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        if (!brand) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/${brand}.json`
            );
            const data = response.data;
            const carpetas = Object.keys(data);
            const fetchPromises = carpetas.map(async (carpeta) => {
                const response = await axios.get(
                    `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/${brand}/${carpeta}.json`
                );
                const productosData = response.data;
                const productosArray = Object.values(productosData);
                const productosConFolder = productosArray.map((producto) => ({
                    ...producto,
                    folder: carpeta,
                }));
                return productosConFolder;
            });
            const productosData = await Promise.all(fetchPromises);
            const allProductos = productosData.flat();
            setProductos(allProductos);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCilinderChange = async (event) => {
        const cilinder = event.target.value;
        setSelectedCilinder(cilinder);
        if (!selectedBrand || !cilinder) return;
        setLoading(true);


        const url = `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/${selectedBrand}/${cilinder}.json`;

        try {
            const response = await axios.get(url);
            const productosData = Object.values(response.data);
            const productosConFolder = productosData.map((producto) => ({
                ...producto,
                folder: cilinder,
            }));
            setProductos(productosConFolder);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }
    if (error) {
        return <p>Error al cargar los datos: {error.message}</p>;
    }

    return (
        <>
            <Grid
                container
                className="container_port"
                spacing={2}
                style={{ marginTop: "20px" }}
            >
                <Grid item xs={12} style={styles.rowContainer}>
                    <FormControl style={{ marginRight: "10px", background: "#fff" }}>
                        <InputLabel id="brand-label">Brand</InputLabel>
                        <Select
                            labelId="brand-label"
                            id="brand"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                        >
                            <MenuItem value="Daytona">Daytona</MenuItem>
                            <MenuItem value="IGM">IGM</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ background: "#fff" }}>
                        <InputLabel id="cilinder-label">Cilinder</InputLabel>
                        <Select
                            labelId="cilinder-label"
                            id="cilinder"
                            value={selectedCilinder}
                            onChange={handleCilinderChange}
                        >
                            <MenuItem value="CC150">CC150</MenuItem>
                            <MenuItem value="CC170">CC170</MenuItem>
                            <MenuItem value="CC180">CC180</MenuItem>
                            <MenuItem value="CC200">CC200</MenuItem>
                            <MenuItem value="CC250">CC250</MenuItem>
                            <MenuItem value="CC300">CC300</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={12}
                style={{
                    ...styles.rowContainer,
                    ...styles.cardContainer,
                    marginBottom: "20px",
                }}
            >
                <Box style={{ ...styles.rowContainer, height: "auto" }}>
                    {productos.length > 0 && (
                        <Grid
                            container
                            item
                            xs={12}
                            style={{ ...styles.rowContainer, ...styles.cardContainer }}
                        >
                            {productos.map((producto) => (
                                <Cards key={producto.id} producto={producto} />
                            ))}
                        </Grid>
                    )}
                </Box>
            </Grid>
        </>
    );
}
