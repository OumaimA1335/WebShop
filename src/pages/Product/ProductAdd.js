import React from "react";
import FormGroup from "@mui/material/FormGroup";
import {
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { BsCircle } from "react-icons/bs";
import CardContent from "@mui/material/CardContent";
import CarouselItems from "../../Components/CarouselItems";
import { useState, useEffect } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Checkbox } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Config/FirebaseConfig";
import { v4 } from "uuid";
const ProductAdd = () => {
  const { id } = useParams();
  const history = useNavigate();
  console.log(id);

  const [souscategorie, setSousCategorie] = React.useState({
    idSousCategorie: 0,
    nom: "",
    nomcategorie: "",
  });
  const [Taille, setTaille] = React.useState([]);
  const [TailleChoisi, setTailleChoisi] = React.useState([]);
  const [partenaire, setPartenaire] = React.useState([]);
  const [image1, setImage1] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [tailleError,setTailleError] =useState("");
  const [inputs, setInputs] = useState({
    nom: "",
    souscategorie_id: 0,
    description: "",
    prix: 0,
    codeBar: "",
    imageList: [""],
    Tailles: [],
    sexe: "",
    model: "",
    quantite: 0,
    partenaire_id: 0,
  });
  const [taille, settaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [quantite, setQuantite] = useState("");
  const [selections, setSelections] = useState([]);

  const handleTailleChange = (event) => {
    console.log(event.target.value);
    settaille(event.target.value);
  };

  const handleCouleurChange = (event) => {
    setCouleur(event.target.value);
   
  };

  const handleQuantiteChange = (event) => {
    setQuantite(event.target.value);
  };

  const handleAjouter = () => {
    const nouvelleSelection = {
      taille: taille,
      couleur: couleur,
      quantite: quantite,
    };
     if(taille !="" && couleur !="" && quantite!="")
     {
    // Check if a selection with the same taille and couleur already exists
    const existingSelection = selections.find(
      (selection) =>
        selection.taille === taille && selection.couleur === couleur
    );

    if (existingSelection) {
      // Modify existing selection
      const updatedSelections = selections.map((selection) =>
        selection === existingSelection ? nouvelleSelection : selection
      );
      setSelections(updatedSelections);
    } else {
      // Add new selection
      setSelections([...selections, nouvelleSelection]);
    }

    // Reset input values
    settaille("");
    setCouleur("");
    setQuantite("");
    setTailleError("");
  }
  else
  {
    setTailleError("Vous devez choisir une taille avec sa couleur et sa quantite")
  }
    console.log(selections);
  };
  useEffect(() => {
    const fetchHandlerSousCategorie = async () => {
      return await axios
        .get(`http://localhost:5005/SousCategorie/getByIdSousCategorie/${id}`)
        .then((res) => res.data);
    };

    const fetchHandlerTaille = async () => {
      return await axios
        .get("http://localhost:5005/Taille/getAllTailles")
        .then((res) => res.data);
    };
    fetchHandlerTaille().then((data) => {
      setTaille(data.tailles);
      console.log(data);
    });
    fetchHandlerSousCategorie().then((data) => {
      setSousCategorie(data);
      console.log(data);
    });
    const fetchHandlerColors = async () => {
      return await axios
        .get("http://localhost:5005/Couleur/getAllColors")
        .then((res) => res.data);
    };
    fetchHandlerColors().then((data) => {
      setColors(data.colors);
      console.log(data);
    });
  }, []);
  useEffect(() => {
    const fetchHandlerPartenaire = async () => {
      return await axios
        .get(
          `http://localhost:5005/Partenaire/getPartenaireByIdSousCategorie/${id}`
        )
        .then((res) => res.data);
    };
    fetchHandlerPartenaire().then((data) => {
      setPartenaire(data.partenaire1);
      console.log(data);
    });
  }, [inputs]);
  console.log(colors);
  /**const handleStorageImage =async() => {
    console.log(image1);  
  await Promise.all( image1.map((item)=>{
        const imageRef = ref(storage, `product/${item.nom}`);
        uploadBytes(imageRef,item.url).then(()=>{
          getDownloadURL(imageRef)
          .then((url) => {
            setImageUrls((prev) => [...prev, url]);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        })

          
          //setImage(null);
        })
  )
    
      console.log(imageUrls);
  };*/
  console.log(imageUrls);
  async function handleImageUpload(e) {
    let nom = v4();
    const imageRef = ref(storage, `product/${nom}`);
    const file = e.target.files[0];
    await uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setImage1((prev) => [
            ...prev,
            {
              nom,
              url,
            },
          ]);
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
    });

    console.log(image1);
  }
  const handleDeleteImage = (item, index) => {
    //suppression de firebase
    const imageRef = ref(storage, "product/" + item.nom);
    console.log(imageRef);
    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully!");
      })
      .catch((error) => {
        console.log("Error deleting image:", error);
      });

    // update state
    setImage1((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name, "Value", e.target.value);
  };
  const handleChangeTaille = (event) => {
    const {
      target: { value },
    } = event;
    setTailleChoisi(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleCheckboxChange = (event) => {
    const checkedItem = event.target.value;
    const isChecked = event.target.checked;
    const item = Taille.find((item) => item.taille === checkedItem);

    if (isChecked) {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        {
          id: item.id,
          taille: item.taille,
          quantity: "",
        },
      ]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleChangeQuantity = (event, itemId) => {
    const quantity = event.target.value;

    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.map((selectedItem) =>
        selectedItem.id === itemId
          ? {
              ...selectedItem,
              quantity,
            }
          : selectedItem
      )
    );
    console.log(selectedItems);
  };

  const sendRequest = async () => {
    console.log("entrer");
    console.log(inputs.couleurs);
    await axios
      .post("http://localhost:5005/Product/createProduct", {
        nom: String(inputs.nom),
        souscategorie_id: Number(id),
        description: String(inputs.description),
        prix: Number(inputs.prix),
        codeBar: String(inputs.codeBar),
        imageList: image1,
        Tailles: selections,
        sexe: String(inputs.sexe),
        model: String(inputs.model),
        quantite: Number(inputs.quantite),
        PartenaireId: Number(inputs.partenaire_id),
      })
      .then((res) => {
        res.data;
        console.log(res.data);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    console.log(TailleChoisi);
    if (souscategorie.nomcategorie === "Vêtements") {
      if (inputs.nom === "") {
        setErrorMessage("S'il vous plait veuillez entrer le nom");
      } else if (inputs.codeBar === "") {
        setErrorMessage("S'il vous plait veuillez entrer le code bar");
      } else if (inputs.partenaire_id === 0) {
        setErrorMessage("S'il vous plait veuillez choisur un partenaire");
      } else if (inputs.description === "") {
        setErrorMessage("S'il vous plait veuillez entrer une description");
      } else if (inputs.prix === 0) {
        setErrorMessage("S'il vous plait veuillez entrer une prix");
      } else if (inputs.sexe === "") {
        setErrorMessage("S'il vous plait veuillez choisir une sexe");
      } else if (selections.length === 0) {
        setErrorMessage("S'il vous plait veuillez choisir une taille");
      } else if (image1.length === 0) {
        setErrorMessage("S'il vous plait veuillez choisir une image");
      } else {
        sendRequest().then(() => history("/admin/liste-produit"));
      }
    } else {
      if (inputs.nom === "") {
        setErrorMessage("S'il vous plait veuillez entrer le nom");
      } else if (inputs.codeBar === "") {
        setErrorMessage("S'il vous plait veuillez entrer le code bar");
      } else if (inputs.partenaire_id === 0) {
        setErrorMessage("S'il vous plait veuillez choisur un partenaire");
      } else if (inputs.description === "") {
        setErrorMessage("S'il vous plait veuillez entrer une description");
      } else if (inputs.prix === 0) {
        setErrorMessage("S'il vous plait veuillez entrer une prix");
      } else if (inputs.sexe === "") {
        setErrorMessage("S'il vous plait veuillez choisir une sexe");
      } else if (inputs.quantite === 0) {
        setErrorMessage("S'il vous plait veuillez entrer une quantité");
      } else if (image1.length === 0) {
        setErrorMessage("S'il vous plait veuillez choisir une image");
      } else {
        sendRequest().then(() => history("/admin/liste-produit"));
      }
    }
  };
  return (
    <div>
      <Card
        style={{
          width: "600px",
          height:
            souscategorie.nomcategorie === "Vêtements" ? "1700px" : "1080px",
          margin: "20px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormGroup>
              <legend
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                }}
              >
                Ajouter un produit
              </legend>
              <TextField
                label="Code Bar"
                variant="outlined"
                color="warning"
                name="codeBar"
                value={inputs.codeBar}
                onChange={handleChange}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />

              <TextField
                label="Nom"
                variant="outlined"
                color="warning"
                name="nom"
                value={inputs.nom}
                onChange={handleChange}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                label="Partenaire"
                helperText="S'il vous plait choisir le partenaire"
                variant="outlined"
                color="warning"
                name="partenaire_id"
                value={inputs.partenaire_id}
                onChange={handleChange}
                required
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              >
                {partenaire.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nom}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-multiline-flexible"
                label="Model"
                type="file"
                variant="outlined"
                color="warning"
                name="description"
                value={inputs.model}
                onChange={handleChange}
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />

              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{
                  marginLeft: "30px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "orange",
                }}
              >
                Sexe
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="female"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={inputs.sexe}
                  control={<Radio value={"Femme"} color="warning" />}
                  onClick={handleChange}
                  label="Female"
                  name="sexe"
                  style={{
                    margin: "20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                />
                <FormControlLabel
                  value={inputs.sexe}
                  control={<Radio value={"Homme"} color="warning" />}
                  label="Male"
                  onClick={handleChange}
                  name="sexe"
                  style={{
                    margin: "20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                />
              </RadioGroup>

              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="outlined"
                color="warning"
                name="description"
                value={inputs.description}
                onChange={handleChange}
                required
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              <TextField
                label="Prix"
                variant="outlined"
                color="warning"
                name="prix"
                value={inputs.prix}
                onChange={handleChange}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              {souscategorie.nomcategorie === "Vêtements" ? (
                <div>
                  <FormControl style={{ marginLeft: 20, width: 100 }}>
                    <InputLabel id="taille-label">Taille</InputLabel>
                    <Select
                      labelId="taille-label"
                      id="taille"
                      value={taille}
                      onChange={handleTailleChange}
                    >
                      {Taille.map((item) => (
                        <MenuItem value={item.id}>{item.taille}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl style={{ marginLeft: 50, width: 100 }}>
                    <InputLabel id="couleur-label">Couleur</InputLabel>
                    <Select
                      labelId="couleur-label"
                      id="couleur"
                      value={couleur}
                      onChange={handleCouleurChange}
                    >
                      {colors.map((item) => (
                        <MenuItem value={item.id}>
                          <BsCircle
                            style={{ backgroundColor: item.couleur ,color:item.couleur}}
                            className="fs-4"
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    id="quantite"
                    label="Quantité"
                    style={{ marginLeft: 50, width: 100 }}
                    value={quantite}
                    onChange={handleQuantiteChange}
                  />

                  <Button
                    variant="contained"
                    color="warning"
                    style={{
                      fontFamily: "initial",
                      fontStyle: "-moz-initial",
                      marginTop: 10,
                      marginLeft:27
                    }}
                    onClick={handleAjouter}
                  >
                    Ajouter
                  </Button>

                  <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Taille</TableCell>
                          <TableCell>Couleur</TableCell>
                          <TableCell>Quantité</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selections.map((selection, index) => {
                           const colorObj = colors.find((color) => color.id === selection.couleur);
                           const colorValue = colorObj ? colorObj.couleur : '';
                           const TailleObj = Taille.find((taille) => taille.id === selection.taille);
                           const TailleValue = TailleObj ? TailleObj.taille : '';
                           return (
                          <TableRow key={index}>
                            <TableCell>{TailleValue}</TableCell>
                            <TableCell>  
                              <BsCircle
                            style={{ backgroundColor: colorValue ,color:colorValue}}
                            className="fs-4"
                          /></TableCell>
                            <TableCell>{selection.quantite}</TableCell>
                          </TableRow>)
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {tailleError && (
                <div
                  style={{
                    backgroundColor: "red",
                    margin: 20,
                    borderRadius: 25,
                    height: 45,
                  }}
                >
                  <p
                    style={{
                      marginLeft: 130,
                      marginTop: 10,
                      color: "white",
                      fontSize: 15,
                      fontFamily: "initial",
                      fontStyle: "-moz-initial",
                    }}
                  >
                    {tailleError}
                  </p>
                </div>
              )}

                </div>
              ) : (
                <TextField
                  id="standard-multiline-flexible"
                  label="Quantité"
                  variant="outlined"
                  color="warning"
                  name="quantite"
                  value={inputs.quantite}
                  onChange={handleChange}
                  required
                  focused
                  style={{ margin: "20px" }}
                  InputLabelProps={{
                    style: { fontWeight: "bold", fontSize: "16px" },
                  }}
                />
              )}
              {errorMessage && (
                <div
                  style={{
                    backgroundColor: "red",
                    margin: 20,
                    borderRadius: 25,
                    height: 45,
                  }}
                >
                  <p
                    style={{
                      marginLeft: 130,
                      marginTop: 10,
                      color: "white",
                      fontSize: 15,
                      fontFamily: "initial",
                      fontStyle: "-moz-initial",
                    }}
                  >
                    {errorMessage}
                  </p>
                </div>
              )}

              <Button
                variant="contained"
                color="warning"
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                  margin: "20px",
                }}
                onClick={handleSubmit}
              >
                Ajouter
              </Button>
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
      <Card
        style={{
          marginTop:
            souscategorie.nomcategorie === "Vêtements" ? "-1720px" : "-1100px",
          width: "450px",
          height: "600px",
          marginLeft: "662px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
              <legend
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                }}
              >
                Séléctionner les images de produit
              </legend>
              <Carousel>
                {image1 &&
                  image1.length > 0 &&
                  image1.map((item, index) => (
                    <Paper>
                      <img
                        style={{
                          width: "300px",
                          height: "300px",
                          marginLeft: "55px",
                        }}
                        src={item.url}
                      />
                      <Button
                        variant="contained"
                        color="warning"
                        style={{ marginLeft: "150px", marginBottom: "15px" }}
                        onClick={() => handleDeleteImage(item, index)}
                      >
                        Supprimer
                      </Button>
                    </Paper>
                  ))}
              </Carousel>

              <Button
                component="label"
                color="warning"
                variant="contained"
                htmlFor="account-settings-upload-image"
                style={{
                  marginTop: "20px",
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                }}
              >
                Sélectionner une image
                <input
                  hidden
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg"
                  id="account-settings-upload-image"
                />
              </Button>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAdd;
