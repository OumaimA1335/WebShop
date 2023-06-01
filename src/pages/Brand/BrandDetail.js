import FormGroup from "@mui/material/FormGroup";
import { Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from "axios";
const BrandDetail = () => {
  const {id } = useParams();
  console.log(id);
  const history = useNavigate();
  const [marque,setMarque]=useState({
    nom :''
  });
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/Marque/getByIdMarque/${id}`)
        .then((res) => res.data)
        .then((data) => {setMarque(data.marque)
          console.log(data);});
    };
    fetchHandler();
  }, [id]);
  console.log(marque)
  const handleChange = (e)=>
  {
    setMarque((prevState)=>
    ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.name, e.target.value);
  }
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5005/Marque/updateMarque/${id}`, {
        nom: String(marque.nom),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/admin/liste-marque"));
  };
  
  return (
    <div>
      <Card style={{ width: "600px", height: "300px", marginLeft: "200px" }}>
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
                Modifier marque
              </legend>
              <TextField
                label="Nom"
                variant="outlined"
                color="warning"
                name="nom"
                onChange={handleChange}
                value={marque.nom}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />

            
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
                Enregistrer les modifications
              </Button>
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
      
      
    </div>
  );
};

export default BrandDetail;
