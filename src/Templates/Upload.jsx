import React, { useState } from "react";
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    LinearProgress,
    Container,
    Typography,
    Box,
    Snackbar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiAlert from "@mui/material/Alert";
// eslint-disable-next-line no-unused-vars
import { storage } from '../firebase/datafirebase';

const Upload = () => {
    const [selectedBrand, setSelectedBrand] = useState("Daytona");
    const [selectedFolder, setSelectedFolder] = useState("CC150");
    const [image, setImage] = useState([]);
    const [progress, setProgress] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            const fileList = Array.from(e.target.files);
            setImage(fileList);
        }
    };

    const handleUpload = async () => {
        if (image.length > 0) {
            const storage = getStorage();
            const database = getDatabase();
            const uploadTasks = [];

            image.forEach((image) => {
                const folderName = uuidv4();
                const storageRef = ref(
                    storage,
                    `images_base/motos_img/${selectedBrand}/${selectedFolder}/${image.name}`
                );
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTasks.push(uploadTask);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progress);
                    },
                    (error) => {
                        console.error(error.message);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                        const productRef = dbRef(
                            database,
                            `Users/Products/imges/motos_img/${selectedBrand}/${selectedFolder}/${folderName}`
                        );
                        //const newImageRef = push(productRef);

                        await set(productRef, {
                            name,
                            description,
                            precio,
                            imageUrl: downloadURL,
                        });

                        console.log("Successfully uploaded image:", downloadURL);
                    }
                );
            });
            await Promise.all(uploadTasks);
            setProgress(0);
            setOpenSnackbar(true);
        } else {
            console.error("Select at least one image to upload");
        }
    };

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [precio, setPrecio] = useState('');

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: "700" }}>
                    Subir Imágenes
                </Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }} style={{ background: "#fff" }}>
                    <InputLabel id="select-brand-label">Seleccione Marca</InputLabel>
                    <Select
                        labelId="select-brand-label"
                        id="select-brand"
                        label="Seleccione Marca"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <MenuItem value="Daytona">Daytona</MenuItem>
                        <MenuItem value="IGM">IGM</MenuItem>
                        <MenuItem value="Marca3">Marca 3</MenuItem>

                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    style={{ background: "#fff" }}
                >
                    <InputLabel id="select-folder-label">Seleccione Carpeta</InputLabel>
                    <Select
                        labelId="select-folder-label"
                        id="select-folder"
                        label="Seleccione Carpeta"
                        value={selectedFolder}
                        onChange={(e) => setSelectedFolder(e.target.value)}
                    >
                        <MenuItem value="CC150">CC150</MenuItem>
                        <MenuItem value="CC170">CC170</MenuItem>
                        <MenuItem value="CC180">CC180</MenuItem>
                        <MenuItem value="CC200">CC200</MenuItem>
                        <MenuItem value="CC250">CC250</MenuItem>
                        <MenuItem value="CC300">CC300</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                    >
                        Elejir Imagen
                        <input
                            type="file"
                            hidden
                            onChange={handleChange}
                            accept="image/*"
                            multiple
                        />
                    </Button>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{ marginBottom: 2 }}

                >
                    <TextField
                        label="Nombre"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ background: "#fff" }}
                    />

                    <TextField
                        label="Descripción"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={description}
                        style={{ background: "#fff" }}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        sx={{ marginBottom: 2 }}
                        style={{ background: "#fff" }}
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    sx={{ marginBottom: 2 }}
                >
                    Subir Imagen
                </Button>
                {progress > 0 && (
                    <LinearProgress variant="determinate" value={progress} />
                )}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <MuiAlert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        ¡Imagen(es) subida(s) con éxito!
                    </MuiAlert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default Upload;
