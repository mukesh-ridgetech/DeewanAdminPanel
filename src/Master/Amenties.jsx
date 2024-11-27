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


const Amenties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAmenties, setEditingAmenties] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false)

  console.log(auth.user._id);

  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchAllAmenties();
  }, []);

  const fetchAllAmenties = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/amenities/getAmenties')
       console.log(respons.data.amenities[0].logo);

       if(respons.data.success){
        setData(respons.data.amenities);
        // message.success('Amenities fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Amenities:', error);
      message.error('Error fetching Amenities.');
    } finally {
      setLoading(false);
    }
  };


  const handleStatusToggle = async(record)=>{
    try {
       const response = await axios.patch(`${baseurl}/api/amenities/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchData()
       }
    } catch (error) {
      console.log(error)
    }
}
  

  const handleAdd = () => {
    setEditingAmenties(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingAmenties(record);
    form.setFieldsValue({
      name: record.name,
      
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
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.post(baseurl+'/api/amenities/createAmenties',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Amenties created successfully!");
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
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.put(`${baseurl}/api/amenities/updateAmenties/${editingAmenties._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Amenties created successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchAllAmenties()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingAmenties) {
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
      title: "Logo",
      // dataIndex: "logo",
      key: "logo",
      render: (_, record) => (

            <>

            <img src={`${baseurl}${record.logo}`} alt="" style={{width:"40px"}}/>
            </>
      ),
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
        Add Amenties
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        // loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingAmenties ? 'Edit Amenties' : 'Add Amenties'}
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
              {editingAmenties ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Amenties;
