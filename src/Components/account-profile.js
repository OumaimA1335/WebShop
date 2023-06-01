import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../Config/FirebaseConfig";
  import { v4 } from "uuid";
  import { auth } from "../Config/FirebaseConfig";
import { useState } from 'react';
 
  export const AccountProfile = () => {
    const user3 = auth.currentUser.toJSON();
    const[imageUser,setImageUser]=useState(user3.photoURL);
    
    async function  handleImageUpload (e) {
      //let nom = user3.displayName;
      const imageRef = ref(storage, `imagesUser/${user3.displayName}`);
      const file = e.target.files[0];
      await uploadBytes(imageRef,file).then(()=>{
        getDownloadURL(imageRef)
        .then((url) => {
          setImageUser(  
            url
           );
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
      });
    }
    return(
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={imageUser}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            style={{fontFamily: "initial",
            fontStyle: "-moz-initial",}}
          >
            {user3.displayName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            style={{fontFamily: "initial",
            fontStyle: "-moz-initial",}}
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
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                }}
              >
                Sélectionner une image
                <input
                  hidden
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg"
                  id="account-settings-upload-image"
                />
              </Button>
      </CardActions>
    </Card>
 ) };
  