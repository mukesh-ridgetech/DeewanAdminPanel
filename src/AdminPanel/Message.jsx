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






const Message = () => {
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
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/massage/getMessage')
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
       const response = await axios.patch(`${baseurl}/api/massage/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchMessage()
       }
    } catch (error) {
      console.log(error)
    }
}


 
  

 


  const columns = [
   


    {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },


    




    

    {
      title: "Status",
      key: "Status",
      render: (_, record) => (
        <Switch
          checked={record.Status === "Active"}
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

export default Message;
