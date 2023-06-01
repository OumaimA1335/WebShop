import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import 'dayjs/locale/fr';
const OffreDetail = () => {
  const {id } = useParams();
  dayjs.locale('fr');
  const today = dayjs();
  console.log(id);
  const history = useNavigate();
  const date =  dayjs();
  const [offre,setOffre]=useState({
    nom:'',
    pourcentage:10,
    dateEnd: dayjs('2022-04-17')
  });
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/Offre/getOfferId/${id}`)
        .then((res) => res.data)
        .then((data) => {setOffre(data.offre)
          console.log(data);});
    };
    fetchHandler();
  }, [id]);
  console.log(offre)
  const handleChange = (e)=>
  {
    setOffre((prevState)=>
    ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.name, e.target.value);
  }
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5005/Offre/updateOffre/${id}`, {
        nom: String(offre.nom),
        pourcentage :Number(offre.pourcentage),
        dateEnd : new Date(offre.dateEnd)
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(offre.nom==="")
    {
      setErrorMessage("Veuillez saisir le nom d'offre ")
    }
    else if (offre.pourcentage==0)
    {
      setErrorMessage("Veuillez saisir le pourcentage d'offre ")
    }else if(offre.dateEnd==null)
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
                Modifier une offre
              </legend>
              <TextField
                label="Nom"
                variant="outlined"
                color="warning"
                name="nom"
                onChange={handleChange}
                value={offre.nom}
                focused
                required
                style={{ marginBottom :"20px" , marginTop:"20px"}}
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
                value={offre.pourcentage}
                focused
                required
                style={{marginBottom :"20px"}}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                  '& input': { color: '#FF6600' },
                  '& fieldset': { borderColor: '#FF6600' ,borderWidth:"2px" }}} 
                name="dateEnd"
                onChange={(date) =>
                  setOffre((prevState) => ({
                    ...prevState,
                    dateEnd: date.format('YYYY-MM-DD')
                  }))
                }
                value={dayjs(offre.dateEnd)}/>
              </LocalizationProvider>
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

export default OffreDetail;
