import React from "react";
import { Divider,  Table, Input} from "antd";
import {AiFillDelete} from "react-icons/ai";
import { useState , useEffect } from "react";
import  {ImSearch}  from 'react-icons/im';
import IconButton from"@mui/material/IconButton";
import { Link } from "react-router-dom";
import  TextField  from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Admin/GetAccountsAdmins")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setAdmins(data.accounts);
      console.log(data);
    });
  }, [search]);
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5005/Admin/deleteAccount/${id}`)
      .then((res) => res.data)
      .then(window.location.reload());
  };
  const handleChange = async (e) => {
    setSearch(() => e.target.value);
    console.log(e.target.name, e.target.value);
  };
  const handlesearch = async () => {
    await axios
      .get(
        `http://localhost:5005/Admin/GetAccountsEmail/${search}`
      )
      .then((res) => res.data)
      .then((data) => {
        setAdmins(data.admin1);
        console.log(data);
      });
    console.log(admins);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
        title: "Role",
        dataIndex: "role_id",
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
     <Button
                variant="contained"
                color="warning"
                style={{
                  fontFamily: "initial",
                  fontStyle: "-moz-initial",
                  position:"fixed",
                  right:"50px" 
                }}
              >
             <Link to={"ajouter-sousAdmin"} style={{ textDecoration:"none" , color:"white"}}> Ajouter un sous admin</Link> 
              </Button>
      <Divider />

      <Table
        columns={columns}
        dataSource={admins}
      
      />
    </div>
  );
};

export default AdminList ;
