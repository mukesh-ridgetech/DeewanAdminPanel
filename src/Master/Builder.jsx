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


const Builder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilder, setEditingBuilder] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");


  const locations = [
    {id:1,value:"Gurugram"},
    {id:2,value:"Noida"},
    {id:3,value:"Delhi"}
  ];
  console.log(auth.user._id);

  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchAllAmenties();
  }, []);

  const fetchAllAmenties = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/builders/getBuilder')
       console.log(respons.data.builders);

       if(respons.data.success){
        setData(respons.data.builders);
        message.success('Builder fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Builder:', error);
      message.error('Error fetching Builder.');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (values) => {
    setSelectedLocation(values);
      console.log(values);
  };
  

  const handleAdd = () => {
    setEditingBuilder(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingBuilder(record);
    form.setFieldsValue({
      name: record.name,
      locations:record.locations,
    });
    setIsModalOpen(true);
  };



  const uploadImage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file.file);
    // console.log(file.file.name);

    try {
      const response = await axios.post(
        `${baseurl}/api/amenities/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


       if(response){
        
        message.success("Image uploaded successfully!");
        setImage(response.data.imageUrl);
       }
      
      
      return response.data.imageUrl// Assuming the API returns the image URL in the 'url' field
    } catch (error) {
      message.error("Error uploading image. Please try again later.");
      console.error("Image upload error:", error);
      return null;
    }
  };


  const handlePost = async(values)=>{
   

    const postdata={
      logo:image1,
      name:values.name,
      locations:values.locations,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.post(baseurl+'/api/builders/createBuilder',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Builder created successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchAllAmenties()
      }
    
    // sdkhbfkshdbfk

      
   

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
    const postdata={
      logo:imageTrue?image1:values.logo,
      name:values.name,
      locations:values.locations,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.put(`${baseurl}/api/builders/updateBuilder/${editingBuilder._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Builder update successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchAllAmenties()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingBuilder) {
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
      title: "Location",
      // dataIndex: "locations",
      key: "locations",
      render: (_, record) => (

           <>
             {
              record?.locations?.map((item)=>{
                  return(
                    <>

                    <span>{item},</span>
                    </>
                  )
              })
             }
           </>
  ),
    },
    {
      title: "Logo",
      // dataIndex: "logo",
      key: "logo",
      render: (_, record) => (

            <>

            <img src={`${baseurl}${record.logo}`} alt="" style={{width:"60px"}}/>
            </>
      ),
    },


    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Switch
          checked={record.status === "Active"}
          // onChange={() => handleStatusToggle(record)}
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
        Add Builder
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingBuilder ? 'Edit Amenties' : 'Add Amenties'}
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
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
            
          >
            <Input  placeholder="Enter Name"/>
          </Form.Item>


          <Form.Item
        label="Location"
        name="locations"
        rules={[{ required: true, message: 'Please select the allowed locations!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select Locations"
          value={selectedLocation}
          onChange={handleChange}
        >
          
          {locations.map(loc => (
            <Option key={loc.id} value={loc.value}>
              {loc.value}
            </Option>
          ))}
        </Select>
      </Form.Item>
             

          <Form.Item
              label="logo"
              name="logo"
              onChange={(e) => setPhoto(e.target.files[0])}
              
             
            >
              <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={uploadImage}
  
                
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item>


            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  height="100px"
                  width="100px"
                />
              </div>
            )}


                <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBuilder ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Builder;
