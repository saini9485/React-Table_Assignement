import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { Button, Input, Space, Table, Checkbox, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
// import { data } from "./TableData";

import "../TableChart.css";

export const TableChart = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [count, setCount] = useState(4);
  const [tdata, setTdata] = useState([
    {
      checkbox: <Checkbox value="checkbox"></Checkbox>,
      id: 1,
      key: "1",
      name: "Rajesh Saini",
      course: "JavaScript",
      age: 22,
      address: "Noida Uttar Pradesh",
    },
    {
      checkbox: <Checkbox value="checkbox"></Checkbox>,
      id: 2,
      key: "2",
      name: "Virendra Verma",
      course: "HTML",
      age: 21,
      address: "Meerut Uttar Pradesh",
    },
    {
      checkbox: <Checkbox value="checkbox"></Checkbox>,
      id: 3,
      key: "3",
      name: "Vimal Yadav",
      course: "React",
      age: 20,
      address: "Allahabad",
    },
  ]);
 
  
// Add Row...
const handleAdd = () => {
  const newData = {
    checkbox: <Checkbox value="checkbox"></Checkbox>,
    key: count,
    id: count,
    name: `Empty `,
    course: "Empty",
    age: "Empty",
    address: `Empty `,
    sorter: (a, b) => a.Empty.length - b.Empty.length,
    sortDirections: ["descend", "ascend"],
  };
  setTdata([...tdata, newData]);
  setCount(count + 1);
};


  //Search ....
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>


           {/* Close... */ }
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : "not found"}
        />
      ) : (
        text
      ),
  });


  // Delete.....
  const handleDelete = (key) => {
    const newData = tdata.filter((item) => item.key !== key);
    setTdata(newData);
  };


  // Header Data.....
  const columns = [
    {
      title: <Checkbox value="checkbox">Select All</Checkbox>,
      dataIndex: "checkbox",
      width: "5%",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      width: "15%",
      ...getColumnSearchProps("course"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "15%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "18%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        tdata.length >= 1 ? (
          <div className="Action">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
            <a>Edit</a>
          </div>
        ) : null,
    },
  ];

  
  return (
    <>
      {/* <h1 style={{textAlign:"center", margin:"0%"}}>Table Assignment</h1> */}
    <div className="tableContainer">
      <div className="addButton">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            margin: 16,
          }}
        >
          Add Row
        </Button>
      </div>
      <Table columns={columns} dataSource={tdata} />;
    </div>
    </>
  );
};
