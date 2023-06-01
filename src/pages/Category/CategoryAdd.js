import FormGroup from "@mui/material/FormGroup";
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const SousCategoryAdd = () => {
  const history = useNavigate();
  const [Taille, setTaille] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs]=useState ({
    nom:'',
    nomcategorie: '',
  });
  const categorie =[
    {
      id :1,
      nom :'Vêtements'
    },
    {
      id :2,
      nom :'Accessoires'
    }
  ]
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Taille/getAllTailles")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setTaille(data.tailles);
      console.log(data);
    });
  }, []);

  const handleChange = (e)=>
  {
    setInputs((prevState)=>
    ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.name, e.target.value);
  }
  const sendRequest= async()=>
  {
    console.log("entrer")
    await axios.post("http://localhost:5005/SousCategorie/createSousCategorie",{
    nom :String(inputs.nom),
    nomcategorie :String(inputs.nomcategorie),
    idSize : Number(inputs.idSize)
  }).then(res=> {res.data
  console.log(res.data)});


  }
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(inputs.nom==="")
    {
      setErrorMessage("Veuillez saisir le nom de sous catégorie");
    }
    else if(inputs.nomcategorie==="")
    {
      setErrorMessage("Veuillez choisir la catégorie");
    }
    else
    {
      sendRequest().then(() => history("/admin/liste-Categorie"))
    }
   
  };
  return (
    <div>
      <Card style={{ width: "600px", height: "500px", marginLeft: "200px" }}>
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
                Ajouter sous catégorie
              </legend>
              <TextField
                label="Nom"
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
                label="Catégorie"
                helperText="S'il vous plait choisir la  catégorie"
                variant="outlined"
                color="warning"
                name="nomcategorie"
                onChange={handleChange}
                value={inputs.nomcategorie}
                required
                focused
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              >
                {categorie.map((option) => (
                  <MenuItem key={option.id} value={option.nom}>
                    {option.nom}
                  </MenuItem>
                ))}
              </TextField>
              {errorMessage && (
                <div
                  style={{
                    backgroundColor: "red",
                    margin: 20,
                    borderRadius: 25,
                    height: 45,
                    width : 290
                    
                  }}
                >
                  <p
                    style={{
                      marginLeft: 20,
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
                onClick={handleSubmit}
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                  margin: "20px",
                }}
              >
                Ajouter
              </Button>
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
      
      
    </div>
  );
};

export default SousCategoryAdd;
