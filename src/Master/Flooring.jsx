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


const FlooringData = [
  { id: 1, name: "Marbal", value: "Marbal" },
  { id: 1, name: "Granite", value: "Granite" },
  
]






const Flooring = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlooring, setEditingFlooring] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");


  
  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchFlooring();
  }, []);

  const fetchFlooring = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/flooring/getFloring')
       console.log(respons.data.newFloring);

       if(respons.data.success){
        setData(respons.data.newFloring);
        // message.success('Flooring fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Flooring:', error);
      message.error('Error fetching Flooring.');
    } finally {
      setLoading(false);
    }
  };


  const handleStatusToggle = async(record)=>{
    try {
       const response = await axios.patch(`${baseurl}/api/flooring/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchFlooring()
       }
    } catch (error) {
      console.log(error)
    }
}


  const handleChange = (values) => {
    setSelectedLocation(values);
      console.log(values);
  };
  

  const handleAdd = () => {
    setEditingFlooring(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingFlooring(record);
    form.setFieldsValue({
      name:record.name,
    });
    setIsModalOpen(true);
  };



  


  const handlePost = async(values)=>{
   

    console.log(values);

    const postdata={
      name:values.name
    }
     

    try {
      const response = await axios.post(baseurl+'/api/flooring/createFloring',postdata);
      console.log(response.data);

      if(response.data){
        message.success("flooring created successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchFlooring()
      }
    
    // sdkhbfkshdbfk

      
   

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
    const postdata={
      name:values.name,
    }
     

    try {
      const response = await axios.put(`${baseurl}/api/flooring/updateFloring/${editingFlooring._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Furnihed update successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchFlooring()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingFlooring) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Flooring
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingFlooring ? 'Edit Flooring' : 'Add Flooring'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >


          <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          >



        <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please select the name!' }]}
      >
        <Select
          // mode="multiple"
          placeholder="Select Name"
          value={selectedLocation}
          onChange={handleChange}
        >
          
          {FlooringData.map(loc => (
            <Option key={loc.id} value={loc.value}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>


              <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingFlooring ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Flooring;
