import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Style } from "@mui/icons-material";
import { Circle } from "@mui/icons-material";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: 20,
  },
  heading: {
    marginBottom: 20,
  },
});

const Facture = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [facture, setFacture] = useState({});
  const [commande, setCommande] = useState({});
  const [produits, setProduits] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchHandlerFacture = async () => {
      return await axios
        .get(`http://localhost:5005/Commande/getFacture/${id}`)
        .then((res) => res.data);
    };
    const fetchHandlerCommande = async () => {
      return await axios
        .get(`http://localhost:5005/Commande/getCommande/${id}`)
        .then((res) => res.data);
    };
    const fetchHandlerProduit = async () => {
      return await axios
        .get(`http://localhost:5005/Commande/getProductsCommande/${id}`)
        .then((res) => res.data);
    };
    const fetchHandlerUser = async () => {
      return await axios
        .get(`http://localhost:5005/Commande/getClient/${id}`)
        .then((res) => res.data);
    };
    fetchHandlerProduit().then((data) => {
      setProduits(data.Produits);
      console.log(data);
    });
    fetchHandlerCommande().then((data) => {
      data.map((item) => {
        setCommande(item);
      });

      console.log(data);
    });
    fetchHandlerFacture().then((data) => {
      data.facture.map((item) => {
        setFacture(item);
      });
      console.log(data);
    });
    fetchHandlerUser().then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);
  const generatePDF = () => {
    const doc = new jsPDF();
    // Insérer le logo de l'entreprise
    /*  const logo = new Image();
     logo.src = './assets/image upload.png';
     doc.addImage(logo, 'PNG', 10, 10, 50, 50);*/
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    // Ajouter le contenu à la facture PDF
    doc.text(`Facture n° ${facture.id}`, 10, 10);
    doc.text(`Email du client : ${user.email}`, 10, 20);
    doc.text(`Adresse du client : ${commande.Adresse}`, 10, 30);
    doc.text(`Numéro téléphone du client : ${commande.Tel}`, 10, 40);
    doc.text(`Date: ${facture.createdAt}`, 10, 50);
    // Ajouter un tableau de produits
    const productsData = produits.map((product) => [
      product.nom,
      product.prix,
      product.taille,
      product.quantite,
    ]);
    doc.autoTable({
      startY: 60,
      head: [["Produit", "Prix unitaire", "Taille", "Quantité"]],
      body: productsData,
    });

    const detailY = doc.autoTable.previous.finalY + 20;
    doc.text(`Total HT: ${facture.TotalHT} dinars`, 140, detailY);
    doc.text(`TVA: ${facture.TVA} dinars`, 140, detailY + 10);
    doc.text(`Total TTC: ${facture.TotalTTC} dinars`, 140, detailY + 20);
    doc.text(`Total Net: ${facture.TotalNet} dinars`, 140, detailY + 30);

    // Enregistrer le fichier PDF
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };
  console.log(commande);
  console.log(facture);
  console.log(user);

  return (
    <div>
      <Typography variant="h4" component="h1" className={classes.heading}>
        Facture #{facture.id}
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          Détails du client
        </Typography>

        <Typography>
          {user.email} <br />
          {commande.Tel} <br />
          {commande.Adresse} <br />
          {facture.createdAt} <br />
        </Typography>
        <br />
        <Typography variant="h5" component="h2" className={classes.heading}>
          Détails du commande
        </Typography>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Order Table">
            <TableHead>
              <TableRow>
                <TableCell>Nom du produit</TableCell>
                <TableCell align="right">Prix</TableCell>
                <TableCell align="right">Taille</TableCell>
                <TableCell align="right">Couleur</TableCell>
                <TableCell align="right">Quantite</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produits.map((item) => (
                <TableRow key={item.nom}>
                  <TableCell component="th" scope="row">
                    {item.nom}
                  </TableCell>
                  <TableCell align="right">{item.prix}</TableCell>
                  <TableCell align="right">{item.taille}</TableCell>
                  <TableCell align="right">
                    <Circle
                      sx={{
                        color: item.couleur,
                        width: 16,
                        height: 16,
                      }}
                      fontSize="small"
                    />
                  </TableCell>
                  <TableCell align="right">{item.quantite}</TableCell>
                  <TableCell align="right">
                    {item.prix * item.quantite}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell colSpan={3}>Total HT</TableCell>
                <TableCell align="right">{facture.TotalHT}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>TVA</TableCell>
                <TableCell align="right">{facture.TVA}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Total TTC</TableCell>
                <TableCell align="right">{facture.TotalTTC}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Total Net</TableCell>
                <TableCell align="right">{facture.TotalNet}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="warning"
          onClick={generatePDF}
          style={{
            fontFamily: "initial",
            fontStyle: "-moz-initial",
            margin: "20px",
            marginLeft: "860px",
          }}
        >
          Imprimer facture
        </Button>
      </Paper>
    </div>
  );
};
export default Facture;
