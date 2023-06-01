import React from "react";
import { Divider,  Table, Input} from "antd";
import { useState,useEffect } from "react";
import  {ImSearch}  from 'react-icons/im';
import IconButton from"@mui/material/IconButton";
import { TextField } from "@mui/material";
import axios from "axios";
const UserList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get("http://localhost:5005/Admin/GetAccountsUsers")
        .then((res) => res.data);
    };
    fetchHandler().then((data) => {
      setAdmins(data.accounts);
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
    }
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
      <Divider />

      <Table
        columns={columns}
        dataSource={admins} 
      />
    </div>
  );
};

export default UserList ;
