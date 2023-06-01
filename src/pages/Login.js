import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { auth } from "../Config/FirebaseConfig";
export const Login = () => {
  const { login, isuser } = useAuth();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({
    id: 0,
    email: "",
    role_id: 0,
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const fetchHandler = async () => {
    return await axios
      .get(`http://localhost:5005/Admin/GetAccountByEmail/${auth.currentUser.email}`)
      .then((res) => res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let verify = await axios.post("http://localhost:5005/Admin/verifyAdmin", {
        email: String(inputs.email),
      });
      if (verify) {
        const Connecter = await login(inputs.email, inputs.password);
        if (Connecter == undefined) {
          console.log(auth.currentUser);
          fetchHandler().then((data) => {
            console.log(data.account);
            localStorage.setItem("user", JSON.stringify(data.account));
            localStorage.setItem("role_id", data.account.role_id);
            console.log(data.account);
          });
        
          history("/admin");
          window.location.reload();
        } else {
          if (Connecter.code == "auth/wrong-password") {
            setErrorMessage("Le mot de passe est incorrect");
          } else if (Connecter.code == "auth/user-not-found") {
            setErrorMessage("L'email est incorrect");
          } else if ((Connecter.code = "auth/invalid-email")) {
            setErrorMessage("Vérifiez votre email et mot de passe");
          }
        }
      } else {
        console.log("You are not admin");
        setErrorMessage("Vous ne pouvez pas accéder à ce site");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(inputs);
    console.log(user);
  };
  return (
    <div>
      <Card
        style={{
          width: "500px",
          height: "500px",
          marginLeft: "500px",
          marginTop: "100px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
              
              <img src={require("../assets/logo.png")} width={220} height={100} alt="logo"/>
              <legend
                style={{
                
                  fontStyle:"italic",
                  fontSize :15
                  
                }}
              >
                Connecter à Shopinet Admin
              </legend>
              <TextField
                label="Email"
                variant="outlined"
                color="warning"
                name="email"
                type={"email"}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    email: e.target.value,
                  })
                }
                value={inputs.email}
                focused
                required
                style={{ margin: "20px", textDecoration: "blod" ,width:400 }}
                InputLabelProps={{
                  style: { fontWeight: "bold", fontSize: "16px" },
                }}
              />
              <TextField
                label="Mot de passe"
                variant="outlined"
                color="warning"
                name="password"
                type={"password"}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    password: e.target.value,
                  })
                }
                value={inputs.password}
                focused
                required
                style={{ margin: "20px", textDecoration: "blod" }}
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
                      marginTop: 15,
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
                Connecter
              </Button>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
