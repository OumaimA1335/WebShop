import React from "react";
import { Divider, Table, Input } from "antd";

import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import  {ImSearch}  from 'react-icons/im';
import IconButton from"@mui/material/IconButton";
import {InputAdornment} from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [product,setProduct]=useState([]);
  const [category,setCategory]=useState([]);
  const [offre,setOffre]=useState([]);
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedValue, setSelectedValue] = useState({
    idProd:null,
    idOffer:null,
  });
  const columns = [
    { 
      title:"Id",
      key: "id",
      dataIndex: "id",
      onclick :  () => {
        setSelectedValue(prevState => ({
          ...prevState,
          idProd: record.id
        }));
      }
    },
    {
      title: "Code bar",
      dataIndex: "codeBar",
    },
    {
      title: "Nom",
      dataIndex: "nom",
    },
    {
      title: "Prix",
      dataIndex: "prix",
    },
    {
      title: "Modifier",
      dataIndex: "id",
      render: (_, record) => (
        <Link to={`detail-produit/${record.id}`}>
          <FaEdit
            className="fs-4"
            style={{ color: "#FF6600", marginLeft: "20px" }}
          />
        </Link>
      ),
    },
    {
      title: "Ajouter à un offre",
      dataIndex: "offreId",
      render: (_, record) => {
        let val ;
        if(record.offreId!=null)
        {
          val = fetchEtatDisabled(record.offreId)
        }
        return (
        <Button
          onClick={() => {
            handleOpen();
            setSelectedValue(prevState => ({
              ...prevState,
              idProd: record.id
            }));
          }}
          disabled={val}
        >
          <IoMdAddCircle
            className="fs-4"
            style={{ color: "#FF6600", marginLeft: "20px" }}
          />
        </Button>
      )},
    },
    {
      title: "Supprimer",
      dataIndex: "id",
      render: (_, record) => (
        <Button
          onClick={() => {
            handleDelete(record.id);
          }}
        >
          <AiFillDelete
            className="fs-4"
            style={{ color: "#FF6600", marginLeft: "20px" }}
          />
        </Button>
      ),
    },
  ];
  
 
useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Product/GetAllProducts")
        .then((res) => res.data);
    };
    const fetchHandlerOffre = async () => {
      return await axios
        .get("http://localhost:5005/Offre/getAllOffres")
        .then((res) => res.data);
    };
    const fetchHandlerCategory = async () => {
      return await axios
        .get("http://localhost:5005/SousCategorie/getAllSousCategories")
        .then((res) => res.data);
    };
    fetchHandlerCategory().then((data) => {
      setCategory(data.sousCategories);
      console.log(data);
    });
    fetchHandler().then((data) => {
      setProduct(data.products);
      console.log(data);
    });
    fetchHandlerOffre().then((data) => {
      setOffre(data.offres);
      console.log(data);
    });
  
  }, [search]);
  console.log(product)
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5005/Product/deleteProduct/${id}`)
      .then((res) => res.data)
      .then(window.location.reload());
  };
  const handleAddToOffer = async () => {
      console.log(selectedValue);
    await axios
      .put(`http://localhost:5005/Product/addProductToOffer/${selectedValue.idProd}/${selectedValue.idOffer}`)
      .then((res) => res.data)
      .then(handleClose())
      .then(location.reload())
     
  };
  const fetchEtatDisabled = async (id) => {
    console.log(id);
    const isdisabled = await axios
       .put(`http://localhost:5005/Offre/deleteProductsOfOffer/${id}`)
       .then((res) => res.data);
       console.log(isdisabled)
       if(isdisabled)
       {
        return true
       }
       else
       {
        return false
       }
   
   };
   const handleChange = async (e) => {
    setSearch(() => e.target.value);
    console.log(e.target.name, e.target.value);
  };
   const handlesearch = async () => {
    await axios
      .get(
        `http://localhost:5005/Product/searchNameProduct/${search}`
      )
      .then((res) => res.data)
      .then((data) => {
        setProduct(data.product);
        console.log(data);
      });
    console.log(product);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px transparent #000",
            borderRadius:"20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2"
           style={{
            marginTop: "20px",
            fontFamily: "initial",
            fontStyle: "-moz-initial",
          }}>
            Choisir un offre
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="standard-select-currency"
              select
              label="Offre"
              helperText="S'il vous plait choisir l'offre"
              variant="outlined"
              color="warning"
              required
              focused
              style={{ margin: "20px" ,width:"300px" }}
              InputLabelProps={{
                style: { fontWeight: "bold", fontSize: "16px" ,fontFamily: "initial",
                fontStyle: "-moz-initial"},
              }}
            >
              {offre.map((option) => (
                <MenuItem key={option.id} value={option.id} style={{
                 fontSize: "16px" ,fontFamily: "initial",
                fontStyle: "-moz-initial" , color:"grey"}}
                onClick={() =>{
                  setSelectedValue(prevState => ({
                    ...prevState,
                    idOffer: option.id,
                  }));
                }}
                >
                  {option.nom}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
          <Button
                onClick={handleAddToOffer}
                variant="contained"
                color="warning"
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                  margin: "20px",
                }}
              >
                Ajouter
              </Button>
        </Box>
      </Modal>
      <TextField
      label="Rechercher"
      variant="outlined"
      color="warning"
      nom="search"
      onChange={handleChange}
      value={search}
      InputLabelProps={{
        style: { fontWeight: "bold", fontSize: "16px" },
      }}
      InputProps={{
        endAdornment: (
            <IconButton onClick={handlesearch}>
              <ImSearch  style={{color:"#FF6600"}}/>
            </IconButton>    
        ),
        style :{width :"350px", fontFamily: "initial",
        fontStyle: "-moz-initial"}
      }
    }
    
    />
      <TextField
        id="standard-select-currency"
        select
        label="Ajouter"
        defaultValue="Vêtements"
        helperText="S'il vous plait choisir une catégorie"
        variant="outlined"
        color="warning"
        required
        focused
        style={{  
        position:"fixed",
        right:"50px"  }}
        InputLabelProps={{
          style: { fontWeight: "bold", fontSize: "16px" ,fontFamily: "initial",
          fontStyle: "-moz-initial" },
        }}
      >
        {category.map((option) => (
        
            <MenuItem key={option.id} value={option.nom}>
                <Link
            to={`ajouter-produit/${option.idSousCategorie}`}
            style={{ textDecoration: "none" ,color:"grey", fontWeight: "bold", fontSize: "16px"}}
          >
            
                {option.nomcategorie}
 
              </Link>
            </MenuItem>
         
        ))}
      </TextField>
      <Divider />
      <Table
      
        columns={columns}
        dataSource={product}
      />
    </div>
  );
};

export default ProductList;
