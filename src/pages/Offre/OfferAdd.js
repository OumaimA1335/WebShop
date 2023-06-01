import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import axios from "axios";
const OffreAdd = () => {
  dayjs.locale('fr');
  const today = dayjs();
  const history = useNavigate();
  const [inputs, setInputs]=useState ({
    nom:'',
    pourcentage:10,
    dateEnd: today.format('YYYY-MM-DD')
  });
  const [errorMessage, setErrorMessage] = useState("");
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
    await axios.post("http://localhost:5005/Offre/createOffre",{
    nom :String(inputs.nom),
    pourcentage : Number(inputs.pourcentage),
    dateEnd : new Date(inputs.dateEnd)
  }).then(res=> {res.data
  console.log(res.data)});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(inputs.nom=="")
    {
      setErrorMessage("Veuillez saisir le nom d'offre ")
    }
    else if (inputs.pourcentage==0)
    {
      setErrorMessage("Veuillez saisir le pourcentage d'offre ")
    }else if(inputs.dateEnd==null)
    {
      setErrorMessage("Veuillez choisr la date fin ")
    }
    else
    {
      sendRequest().then(() => history("/admin/liste-offre"))
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
                Ajouter une offre
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
                label="pourcentage"
                variant="outlined"
                color="warning"
                name="pourcentage"
                onChange={handleChange}
                value={inputs.pourcentage}
                focused
                required
                style={{ margin: "20px" }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              <div style={{margin:"20px" }}> 
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                  '& input': { color: '#FF6600' },
                  '& fieldset': { borderColor: '#FF6600' ,borderWidth:"2px" }}} 
                name="dateEnd"
                onChange={(date) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    dateEnd: date.format('YYYY-MM-DD')
                  }))
                }
                value={dayjs(inputs.dateEnd)}/>
              </LocalizationProvider>
              </div>
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

export default OffreAdd;
