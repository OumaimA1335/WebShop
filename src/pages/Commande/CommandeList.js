import * as React  from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BsFillPrinterFill } from "react-icons/bs";
import  {ImSearch}  from 'react-icons/im';
import { Divider } from "antd";
import { TextField } from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react"
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Circle } from '@mui/icons-material';

function Row(props) {
  const { row } = props;
  console.log(row.confirmation);
  const [open, setOpen] = React.useState(false);
  const [produits, setProduits] = React.useState([]);
  const [etat,setEtat] =useState(row.Etat);
  const [etatConfirmation ,setEtatConfirmation] = useState(row.confirmation);
  const [isDisabled,setIsDisabled]=useState({
    livraison : false,
    confirmation : false,
    facture : true
  });
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get(`http://localhost:5005/Commande/getProductsCommande/${row.id}`)
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setProduits(data.Produits);
      console.log(data);
    });
  }, []);
  const handleEtat=async()=>{
    setEtat("Livrée");
    setIsDisabled(prevState => ({
      ...prevState,
      livraison: true
    }));
    return await axios
    .put(`http://localhost:5005/Commande/updateCommande/${row.id}`)
    .then((res) => res.data);
  }
  const handleEtatConfirmation = async ()=>{
    console.log("enter");
    setEtatConfirmation("Confirmée");
    setIsDisabled(prevState => ({
      ...prevState,
      confirmation: true
    }));
     await axios
    .put(`http://localhost:5005/Commande/updateConfirmation/${row.id}`)
    .then((res) => res.data);
    await axios
    .post(`http://localhost:5005/Commande/createFacture/${row.id}`)
    .then((res) => res.data);

  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.Adresse}</TableCell>
        <TableCell align="right">{row.Tel}</TableCell>
        <TableCell align="right">{row.idClient}</TableCell>
        <TableCell align="right">{row.Paiement}</TableCell>
        <TableCell align="right">
          <Button
        disabled={etatConfirmation === 'Confirmée'}
          >
          {etatConfirmation==='Non confirmeé' ? 
       <BsFillCheckCircleFill
            className="fs-4"
            onClick={handleEtatConfirmation}
            style={{ marginLeft: "35px", color:"red" }}
          />
          :
          <BsFillCheckCircleFill
            className="fs-4"
            style={{ marginLeft: "35px", color: "green" }}
          />
        }
        </Button>
        </TableCell>
        <TableCell align="right">
          <Button
        disabled={etat === 'Livrée'}
          >
          {
       etat=="Non livrée" ? 
       <BsFillCheckCircleFill
            className="fs-4"
            onClick={handleEtat}
            
            style={{ marginLeft: "35px", color:"red" }}
          />
          :
          <BsFillCheckCircleFill
            className="fs-4"
            style={{ marginLeft: "35px", color: "green" }}
          />
        }
        </Button>
        </TableCell>
       
        <TableCell align="right">
        <Button disabled ={etatConfirmation === "Non confirmeé"}>
          <Link to={`facture/${row.id}`}>
          
          <BsFillPrinterFill
            className="fs-4"
            style={{ marginRight: "50px", color: "#FF6600" }}
          />
        
          </Link>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produits
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Couleur</TableCell>
                    <TableCell>Taille</TableCell>
                    <TableCell>Quantité</TableCell>
                    <TableCell align="right">Prix</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   {produits.map((produit) => (
                    <TableRow key={produit.nom}>
                      <TableCell component="th" scope="row">
                        {produit.nom}
                      </TableCell>
                      <TableCell>
                      <Circle
                
                  sx={{
                    color: produit.couleur,
                    width: 16,
                    height: 16,
                  }}
                  fontSize="small"
                /></TableCell>
                      <TableCell>{produit.taille}</TableCell>
                      <TableCell>{produit.quantite}</TableCell>
                      <TableCell align="right">{produit.prix}</TableCell>
                    </TableRow>
                 ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CommandeList() {
  const [commandes,setCommandes] = useState([]);
  const [search,setSearch]=useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Commande/getAllCommandes")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setCommandes(data.commandes);
      console.log(data);
    });
  }, [search]);
  const handleChange = async (e) => {
    setSearch(() => e.target.value);
    console.log(e.target.name, e.target.value);
  };
  const handlesearch = async () => {
    await axios
      .get(
        `http://localhost:5005/Commande/getCommande/${search}`
      )
      .then((res) => res.data)
      .then((data) => {
        setCommandes(data);
        console.log(data);
      });
    console.log(commandes);
  };
  return (
    <div>
         <TextField
      label="Rechercher"
      variant="outlined"
      color="warning"
      onChange={handleChange}
      value={search}
      InputLabelProps={{
        style: { fontWeight: "bold", fontSize: "16px" },
      }}
      InputProps={{
        endAdornment: (
            <IconButton onClick={handlesearch}>
              <ImSearch style={{color:"#FF6600"}}/>
            </IconButton>    
        ),
        style :{width :"350px", fontFamily: "initial",
        fontStyle: "-moz-initial"}
      }
    }
    
    />
    <Divider/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Commande</TableCell>
            <TableCell align="right">Adresse</TableCell>
            <TableCell align="right">Téléphone</TableCell>
            <TableCell align="right">Id client</TableCell>
            <TableCell align="right">Paiement</TableCell>
            <TableCell align="right">Etat de confirmation</TableCell>
            <TableCell align="right">Etat de livraision</TableCell>
            <TableCell align="right">Imprimer facture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commandes.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
   
  );
}
