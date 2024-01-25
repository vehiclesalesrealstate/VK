import React, { useEffect, useState } from "react";
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

import "firebase/storage";
import CardContent from "@mui/joy/CardContent";
import CardMedia from "@mui/material/CardMedia";

import axios from "axios";

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
    const { description, imageUrl, name, precio } = producto;

    return (
        <Grid item padding="5px">
            <Card style={{ maxWidth: 345 }}>
                <CardContent>
                    <h3>{name}</h3>
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
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography color="text.secondary">Precio: ${precio}</Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};
export default function CardLayers3d({ searchTerm, imageUrls: propImageUrls }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrand, setSelectedBrand] = React.useState("Daytona");
    const [selectedCilinder, setSelectedCilinder] = React.useState("CC150");

    const handleBrandChange = async (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/Daytona.json`
                );
                const data = response.data;
                const carpetas = Object.keys(data);
                const fetchPromises = carpetas.map(async (carpeta) => {
                    const response = await axios.get(
                        `https://akvehicle45-default-rtdb.firebaseio.com/Users/Products/imges/motos_img/Daytona/${carpeta}.json`
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
        fetchData();
    }, [propImageUrls, searchTerm]);
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
                </Box>
            </Grid>
        </>
    );
}
