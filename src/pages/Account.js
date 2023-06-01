import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  CardHeader,
  TextField,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Config/FirebaseConfig";
import { auth } from "../Config/FirebaseConfig";
import { useCallback, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
const Account = () => {
  const { email } = useAuth();
  const history = useNavigate();
  const user3 = auth.currentUser.toJSON();
  console.log(user3);
  const [imageUser, setImageUser] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    password: "",
    ConfirmPassword: "",
  });
  const [user, setUser] = useState({
    id: 0,
    email: "",
    role_id: 0,
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  async function handleImageUpload(e) {
    //let nom = user3.displayName;
    const imageRef = ref(storage, `imagesUser/${user3.email}`);
    const file = e.target.files[0];
    await uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUser(prevState => ({
            ...prevState, 
            image: url 
          }));
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
    });
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get(`http://localhost:5005/Admin/GetAccountByEmail/${user3.email}`)
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setUser(data.account);

      console.log(data);
    });
    setImageUser(user.image);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        values.ConfirmPassword != "" &&
        values.password != "" &&
        user.image != ""
      ) {
        const Update = await email(values.password, user.image);
        if (Update === undefined) {
          await axios
            .put(`http://localhost:5005/Admin/updateAccount/${user.id}`, {
              image: String(user.image),
            })
            .then((res) => {
              res.data;
              console.log("updated in postgres");
            });
          console.log("successuflly");
          history("/admin");
        } else {
          if (Update.code === "auth/weak-password") {
            console.log("Password too weak");
            setErrorMessage("Mot de passe n'est pas assez fort");
          }
          if (Update.code === "auth/requires-recent-login") {
            console.log("Tu dois reconnecter");
            setErrorMessage(
              "Tu dois reconnecter pour modifier vos coordonneés"
            );
          } else {
            console.log("Unknown error:");
          }
          setButtonClicked(true);
        }
      } else {
        setErrorMessage("Veuillez remplir les champs");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Profile</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={user.image}
                        sx={{
                          height: 80,
                          mb: 2,
                          width: 80,
                        }}
                      />
                      <Typography
                        gutterBottom
                        variant="h7"
                        style={{
                          fontFamily: "initial",
                          fontStyle: "-moz-initial",
                        }}
                      >
                        {user.email}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        style={{
                          fontFamily: "initial",
                          fontStyle: "-moz-initial",
                        }}
                      >
                        {user3.phoneNumber}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      component="label"
                      color="warning"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                      style={{
                        marginTop: "20px",
                        marginLeft: "45px",
                        fontFamily: "initial",
                        fontStyle: "-moz-initial",
                      }}
                    >
                      Sélectionner une image
                      <input
                        hidden
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg, image/jpg"
                        id="account-settings-upload-image"
                      />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <Card>
                  <CardHeader />
                  <h4
                    style={{
                      fontFamily: "initial",
                      fontStyle: "-moz-initial",
                      marginLeft: "50px",
                    }}
                  >
                    {" "}
                    Vos coordonneés
                  </h4>
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={10}>
                          <TextField
                            fullWidth
                            color="warning"
                            helperText="S'il vous plait saisir votre nouveau mot de passe"
                            label="Votre mot de passe"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            value={values.password}
                            InputLabelProps={{
                              style: { fontWeight: "bold", fontSize: "16px" },
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={10}>
                          <TextField
                            fullWidth
                            color="warning"
                            helperText="S'il vous plait confirmer votre noveau mot de passe"
                            label="Confirmer Votre mot de passe"
                            name="ConfirmPassword"
                            type="password"
                            value={values.ConfirmPassword}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                              style: { fontWeight: "bold", fontSize: "16px" },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  {errorMessage && (
                    <div
                      style={{
                        backgroundColor: "red",
                        margin: 20,
                        borderRadius: 25,
                        height: 40,
                        width: 360,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          marginLeft: 10,
                          marginTop :15,
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
                  <CardActions sx={{ position: "relative" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      style={{
                        fontFamily: "initial",
                        fontStyle: "-moz-initial",
                      }}
                      onClick={handleSubmit}
                    >
                      Enregistrer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Account;
