import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Cards3D from "../components/Cards3D";
import "firebase/storage";
import { getDownloadURL, list, ref } from "firebase/storage";
import { storage } from "../firebase/database";
import img_1 from '../img/img_1.jpg'
import img_2 from '../img/img_2.jpg'
import img_3 from '../img/img_3.jpg'

const Home = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [imageUrls, setImageUrls] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState("Daytona");
  const [selectedCilinder, setSelectedCilinder] = React.useState("CC150");
  

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleCilinderChange = (event) => {
    setSelectedCilinder(event.target.value);
  };

  const handleSearchClick = async () => {
    const storageRef = ref(
      storage,
      `images_base/motos_img/${selectedBrand}/${selectedCilinder}`
    );
    const listResult = await list(storageRef);
    const urls = await Promise.all(
      listResult.items.map((item) => getDownloadURL(item))
    );
    setImageUrls(urls);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {

      setCurrentImage((prevImage) => (prevImage % 3) + 1);
    }, 5500);


    return () => clearInterval(intervalId);
  }, []);

  function getImageUrl() {
    // Devuelve la URL de la imagen actual
    switch (currentImage) {
      case 1:
        return img_1;
      case 2:
        return img_2;
      case 3:
        return img_3;
      // Agrega más casos según sea necesario
      default:
        return img_1;
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          backgroundColor: "#f2f2f2",
        }}
      >
        <Grid
          container
          className="container_port"
          spacing={2}
          style={{
            ...styles.portImgCont,
            backgroundImage: `url(${getImageUrl()})`,
            
          }}
        >
          <Grid item xs={12} style={styles.columnContainer}>
            <h1 style={{ ...styles.welcomeText, 
              fontWeight:'800' }}>"RUEDA CON PASIÓN, VIAJA CON CONFIANZA: TU DESTINO, NUESTRA GARANTÍA."</h1>
          </Grid>
        </Grid>
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
          <Grid item xs={12} style={styles.rowContainer}>
            <Button
              variant="contained"
              style={{
                marginLeft: "10px",
                ...styles.button,
                background: "#fff",
                color: "#000",
              }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Cards3D imageUrls={imageUrls} searchTerm={searchTerm} />
      </Paper >
    </>
  );
};

const styles = {
  portImgCont: {

    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    width: "100%",
    height: "80vh",
    fontSize: "14px",
    display: "grid",
    gridTemplateColumns: "1fr",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    margin: "0",
  },
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
  button: {
    width: "100%",
    maxWidth: "200px",
    marginBottom: "10px",
  },
  textField: {
    width: "100%",
    maxWidth: "250px",

    marginBottom: "10px",
  },
  cardContainer: {
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  welcomeText: {
    display: "inline-block",
    color: "wheat",
    padding: "20px",
 
  },
};

export default Home;
