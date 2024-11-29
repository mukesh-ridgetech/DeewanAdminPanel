import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Upload,
  Switch,
} from "antd";
import { BellOutlined,TranslationOutlined ,TruckOutlined ,CloseCircleOutlined } from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import { baseurl } from "../helper/Helper";
import axios from "axios";
import Password from "antd/es/input/Password";
// import { baseurl } from "../helper/Helper";
import { useAuth } from "../context/auth";


const FencingData = [
  { id: 1, name: "North", value: "North" },
  { id: 1, name: "South", value: "South" },
  { id: 1, name: "East", value: "East" },
  { id: 1, name: "West", value: "West" },
]






const Schedule = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");


  
  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/shedule/getShedule')
       console.log("message is",respons.data);

       if(respons.data){
        setData(respons.data);
        
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Fencing:', error);
      message.error('Error fetching Fencing.');
    } finally {
      setLoading(false);
    }
  };


  const handleStatusToggle = async(record)=>{
    try {
       const response = await axios.patch(`${baseurl}/api/shedule/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchRequest()
       }
    } catch (error) {
      console.log(error)
    }
}


 
  

 


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },


    {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },


      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },

      {
        title: "Date",
        dataIndex: "date",
        key: "name",
      },

      // properties
      
      {
        title: "Property",
        dataIndex: ['properties','propertiesName'],
        key: "name",
      },



    

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === "Active"}
          onChange={() => handleStatusToggle(record)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },

    
  ];

  return (
    <div>
      
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />
    </div>
  );
};

export default Schedule;
