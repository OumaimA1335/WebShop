import React ,{useState,useEffect} from "react";
import { Column } from "@ant-design/plots";
import {AiFillHeart} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import{BsFillCartFill} from "react-icons/bs";
import { Table ,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
export const Dashboard = () => {
  const [nbFav,setNbFav] =useState(0);
  const [nbUser,setNbUser] = useState(0);
  const [nbOrder,setNbOrder] = useState(0);
  const [revenue,setRevenue] =useState([]);
  const [avis,setAvis] =useState([]);
  const role = localStorage.getItem("role_id");
  useEffect(()=>
  {
    const fetchHandlerOrder = async () => {
      return await axios
        .get("http://localhost:5005/Dashboard/NouveauxCommandes")
        .then((res) => res.data);
    };
    fetchHandlerOrder().then((data) => {
      setNbOrder(data.nvCommande);
      console.log(data);
    });
    const fetchHandlerFav = async () => {
      return await axios
        .get("http://localhost:5005/Dashboard/nombreProduitsAimee")
        .then((res) => res.data);
    };
    fetchHandlerFav().then((data) => {
      setNbFav(data.NbProductsFav);
      console.log(data);
    });
    const fetchHandlerUser = async () => {
      return await axios
        .get("http://localhost:5005/Dashboard/NouveauxUtilisateurs")
        .then((res) => res.data);
    };
    fetchHandlerUser().then((data) => {
      setNbUser(data.NbUser);
      console.log(data);
    });
    const fetchHandlerRevenue = async () => {
      return await axios
        .get("http://localhost:5005/Dashboard/getRevenue")
        .then((res) => res.data);
    };
    fetchHandlerRevenue().then((data) => {
      setRevenue(data.revenueByDay);
      console.log(data);
    });
    const fetchHandlerAvis = async () => {
      return await axios
        .get("http://localhost:5005/Avis/getAllAvis")
        .then((res) => res.data);
    };
    fetchHandlerAvis().then((data) => {
      setAvis(data.tabAvis);
      console.log(data);
    });
  },[])
  console.log(revenue);
  const config = {
    xField: "jour",
    yField: "revenue",
    color :"#FF6600",
    label: {
      position: "middle",
     
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      jour: {
        alias: "Jour",
      },
      reveune: {
        alias: "reveune",
      },
    },
  };
  return (
   
    <div>
       {role && role ==1 ?(
        <>
      <h3 className="mb-4"> Dashboard</h3>
      <div className="d-flex justify-content-between align-items gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
             <AiFillHeart style={{color :"#FF6600" ,fontSize:30}}/>
          
          </div>
          <div className="d-flex flex-column justify-content align-items-end">
            <h6> {nbFav}</h6>
            Nombre des produit aimeé
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <FaUserAlt style={{color :"#FF6600" ,fontSize:30}}/>
          
          </div>
          <div className="d-flex flex-column justify-content align-items-end">
            <h6>{nbUser}</h6>
          Nombre des utilisateurs
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
           <BsFillCartFill style={{color :"#FF6600" ,fontSize:30}}/>
          </div>
          <div className="d-flex flex-column justify-content align-items-end">
            <h6 >{nbOrder}</h6>
            Nombre des nouveaux commandes
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Revenue par semaine</h3>
        <div>
          <Column {...config} data={revenue} />
        </div>
      </div>
      <div className="mt-4">
      <h3 className="mb-4">Avis</h3>
      <div>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Nombre d'étoile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avis.map((row) => (
            <TableRow key={row.nom}>
              <TableCell component="th" scope="row">{row.nom}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>  <Rating value={row.nbEtoile} readOnly /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        </div>
      </>
          ): <h3 className="mb-4"> Bienvenue</h3>}
    </div>

  );
};
