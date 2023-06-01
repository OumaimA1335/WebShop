import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { Divider } from "antd";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import Button from "@mui/material/Button";
import axios from "axios";

const ReclamationList = () => {
  const [reclamation, setReclamation] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Reclamation/getAllReclamations")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setReclamation(data.TabReclamations);
      console.log(data);
    });
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5005/Reclamation/deleteReclamation/${id}`)
      .then((res) => res.data)
      .then(window.location.reload());
  };
  const columns = [
    {
      title: "Id Client",
      dataIndex: "idClient",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Téléphone",
      dataIndex: "Telephone",
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
          <GrValidate
            className="fs-4"
            style={{ color: "#FF6600", marginLeft: "20px" }}
          />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4">Réclamation </h3>
        <Divider />
        <div>
          <Table columns={columns} dataSource={reclamation} />
        </div>
      </div>
    </div>
  );
};

export default ReclamationList;
