import FormGroup from "@mui/material/FormGroup";
import { Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
const SousCategoryDetail = () => {
  const {id} = useParams();
  console.log(id);
  const history = useNavigate();
  const [sousCategorie,setsousCategorie]=useState({});
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/SousCategorie/getByIdSousCategorie/${id}`)
        .then((res) => res.data)
        .then((data) => {setsousCategorie(data)
          console.log(data);});
    };
    fetchHandler();
  }, [id]);
  console.log(sousCategorie)
 
  const handleChange = (e)=>
  {
    setsousCategorie((prevState)=>
    ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.name, e.target.value);
  }
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5005/SousCategorie/updateSousCategorie/${id}`, {
        nom: String(sousCategorie.nom),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(sousCategorie.nom==="")
    {
      setErrorMessage("Veuillez saisir le nom de sous catégorie");
    }
    else
    {
      sendRequest().then(() => history("/admin/liste-Categorie"))
    }
  };
  return (
    <div>
      <Card style={{ width: "600px", height: "350px", marginLeft: "200px" }}>
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
                Modifier catégorie
              </legend>
              <TextField
                label="Nom"
                variant="outlined"
                color="warning"
                name="nom"
                onChange={handleChange}
                value={sousCategorie.nom}
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
                Modifier
              </Button>
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
      
      
    </div>
  );
};

export default SousCategoryDetail;
