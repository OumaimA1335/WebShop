import React from "react";
import { Divider, Table, Input } from "antd";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
const PartenaireList = () => {
  const [partenaire, sePartenaire] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Partenaire/getAllPartenaires")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      sePartenaire(data.partenaires);
      console.log(data);
    });
  }, [search]);

  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5005/Partenaire/deletePartenaire/${id}`)
      .then((res) => res.data)
      .then(window.location.reload());
  };
  const handleChange = async (e) => {
    setSearch(() => e.target.value);
    console.log(e.target.name, e.target.value);
  };
  const handlesearch = async () => {
    await axios
      .get(`http://localhost:5005/Partenaire/getByNomPartenaire/${search}`)
      .then((res) => res.data)
      .then((data) => {
        sePartenaire(data.partenaire1);
        console.log(data);
      });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Modifier",
      dataIndex: "id",
      render: (_, record) => (
        <Link to={`modifier-partenaire/${record.id}`}>
          <FaEdit
            className="fs-4"
            style={{ color: "#FF6600", marginLeft: "20px" }}
          />
        </Link>
      ),
    },
    {
      title: "Supprimer",
      dataIndex: "supprimer",
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
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div>
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
              <ImSearch style={{ color: "#FF6600" }} />
            </IconButton>
          ),
          style: {
            width: "350px",
            fontFamily: "initial",
            fontStyle: "-moz-initial",
          },
        }}
      />
      <Button
        variant="contained"
        color="warning"
        style={{
          fontFamily: "initial",
          fontStyle: "-moz-initial",
          position: "fixed",
          right: "50px",
        }}
      >
        <Link
          to={"ajouter-partenaire"}
          style={{ textDecoration: "none", color: "white" }}
        >
          {" "}
          Ajouter Partenaire
        </Link>
      </Button>
      <Divider />

      <Table columns={columns} dataSource={partenaire} />
    </div>
  );
};

export default PartenaireList;
