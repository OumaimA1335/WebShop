import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    email: "demo@devias.io",
    password: "oumaima1507"
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader />
        <h4   style={{fontFamily: "initial",fontStyle: "-moz-initial",marginLeft:"50px"}}> Votre coordonneés</h4>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={10}>
                <TextField
                  fullWidth
                  color="warning"
                  helperText="Please specify your email"
                  label="Your Email"
                  name="Email"
                  onChange={handleChange}
                  required
                  value={values.email}
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
                  helperText="Please specify Your password"
                  label="Your Password"
                  name="Password"
                  onChange={handleChange}
                  required
                  value={values.password}
                  InputLabelProps={{
                    style: { fontWeight: "bold", fontSize: "16px" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="warning" style={{fontFamily: "initial",
            fontStyle: "-moz-initial",}}>Enregistrer</Button>
        </CardActions>
      </Card>
    </form>
  );
};
