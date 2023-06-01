import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const BrandAdd = () => {
  const history = useNavigate();
  const [inputs, setInputs]=useState ({
    nom:'',
  });
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
    await axios.post("http://localhost:5005/Marque/createMarque",{
    nom :String(inputs.nom),
  }).then(res=> {res.data
  console.log(res.data)});


  }
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/admin/liste-marque"))
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
                Ajouter une marque 
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
      
      
    </div>
  );
};

export default BrandAdd;
