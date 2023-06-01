import React, { useState ,useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import { FiDelete } from 'react-icons/fi';
import Button from '@mui/material/Button';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../src/Config/FirebaseConfig";
import { v4 } from "uuid";
import Item from 'antd/es/list/Item';
import { ContentCutOutlined } from '@mui/icons-material';
const CarouselItems = (props) => {
  console.log(props.imageUrl);
  const imageUrl  = [props.imageUrl];
  console.log(imageUrl);

  useEffect(() => {
    console.log("image"+imageUrl);
      imageUrl.map((item)=>{
        console.log(item.url)
      })
  }, [imageUrl])

  const handleDeleteImage = (item) => {
    //const imagesRef = ref(storage, "images/"+item);
   /*getDownloadURL(imagesRef).then((url) => {
      console.log(url); 
    });*/
    console.log(imagesRef);
    deleteObject(imagesRef).then(() => {
      console.log('Image deleted successfully!');
    }).catch((error) => {
      console.log('Error deleting image:', error);
    });
    /*setTableauImage((prevImages) => {
      const newImages = [...prevImages];
      console.log(index)
      newImages.splice(index, 1);
      console.log(tableauImage.length);
      console.log("supprimer")
      return newImages;
    });*/
   
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <Carousel>
        {imageUrl && imageUrl.length>1 && imageUrl.map((item, index) => (
          <Paper key={index}>
            <img
              style={{
                width: '300px',
                height: '300px',
                marginLeft: '55px',
              }}
              src={item.url}
              alt={`image${index}`}
            />
            <p
              style={{
                fontFamily: 'initial',
                fontStyle: '-moz-initial',
                margin: '20px',
                marginLeft: '180px',
                marginBottom: '10px',
              }}
            >
              {`image ${index + 1}`}
            </p>
            <Button
              variant="contained"
              color="warning"
              style={{ marginLeft: '150px', marginBottom: '10px' }}
              onClick={() => handleDeleteImage(item)}
            >
              Supprimer
            </Button>
          </Paper>
        ))}
            </Carousel>
    </div>
  );
};

export default CarouselItems;
