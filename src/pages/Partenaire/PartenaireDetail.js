import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const PartenaireDetail = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    nom: "",
    type: "",
    marque: "",
    categorie_id: 0,
  });
  const { id } = useParams();
  console.log(id);
  const [SousCategorie, setSousCategorie] = useState({
    idSousCategorie: 0,
    nom: "",
    nomcategorie: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/Partenaire/getByIdPartenaire/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInputs(data.partenaire);
          console.log(data);
        });
    };
    fetchHandler();
    const fetchHandlerSousCategorie = async () => {
      return await axios
        .get("http://localhost:5005/SousCategorie/getAllSousCategories")
        .then((res) => res.data);
    };
    fetchHandlerSousCategorie().then((data) => {
      setSousCategorie(data.sousCategories);
      console.log(data);
    });
  }, [id]);
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(
          `http://localhost:5005/SousCategorie/getByIdSousCategorie/${inputs.categorie_id}`
        )
        .then((res) => res.data)
        .then((data) => {
          setSousCategorie(data);
          console.log(data);
        });
    };
    fetchHandler();
  }, [inputs]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name, e.target.value);
  };
  const sendRequest = async () => {
    console.log("entrer");
    await axios
      .put(`http://localhost:5005/Partenaire/updatePartenaire/${id}`, {
        nom: String(inputs.nom),
        type: String(inputs.type),
        marque: String(inputs.marque),
        categorie_id: Number(inputs.categorie_id),
      })
      .then((res) => {
        res.data;
        console.log(res.data);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (inputs.nom === "") {
      setErrorMessage("veuillez entrer le nom du partenaire");
    } else if (inputs.type == "") {
      setErrorMessage("veuillez choisir le type du partenaire");
    } else if (inputs.categorie_id === 0) {
      setErrorMessage("veuillez choisir le catégorie du partenaire");
    } else {
      sendRequest().then(() => history("/admin/liste-partenaire"));
    }
  };
  const typePartenaire = [
    { id: 1, type: "Entreprise" },
    { id: 2, type: "Organisme" },
    { id: 3, type: "Individu" },
  ];
  return (
    <div>
      <Card style={{ width: "600px", height: "700px", marginLeft: "200px" }}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
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
                Modifier un partenaire
              </legend>
              <TextField
                label="Nom Partenaire"
                variant="outlined"
                color="warning"
                name="nom"
                onChange={handleChange}
                value={inputs.nom}
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
                label="Type Partenaire"
                helperText="S'il vous plait choisir le type de partenaire"
                variant="outlined"
                color="warning"
                name="type"
                value={inputs.type}
                onChange={handleChange}
                required
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              >
                {typePartenaire.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                label="Catégorie"
                helperText="S'il vous plait choisir le type de partenaire"
                variant="outlined"
                color="warning"
                name="categorie_id"
                value={SousCategorie.nomcategorie}
                onChange={handleChange}
                required
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
                inputProps={{ readOnly: true }}
              />

              <TextField
                label="Nom Marque"
                variant="outlined"
                helperText="S'il vous plait entrer le nom de votre marque si tu possedé"
                color="warning"
                name="marque"
                onChange={handleChange}
                value={inputs.marque}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />

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
                      marginLeft: 50,
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
                Modifier
              </Button>
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartenaireDetail;
