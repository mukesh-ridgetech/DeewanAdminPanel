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


const countryIndia = [
  { id: 1, name: "India", value: "India" },
]


const indiaStates =[]


const TrendingProperties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrendingProperties, setEditingTrendingProperties] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState("");
  const [location,setLocation] = useState();
  const [properties,setProperties] = useState();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);


  const locations = [
    {id:1,value:"Gurugram"},
    {id:2,value:"Noida"},
    {id:3,value:"Delhi"}
  ];
  console.log(auth.user._id);

  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchTrendingProperties();
    fetchLocation();
    fetchProperties();
  }, []);

  const fetchTrendingProperties = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/trending/getTrending')
      //  console.log(respons.data);

       if(respons.data){
        setData(respons.data);
        // message.success('Location fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Location:', error);
      message.error('Error fetching Location.');
    } finally {
      setLoading(false);
    }
  };


  const fetchLocation = async()=>{
           try {
              const response =  await axios.get(baseurl + '/api/locations/getLoacation');
              // console.log(response.data.locations);

              if(response.data){
                setLocation(response.data.locations)
              }
              
           } catch (error) {
             console.log(error);
           }
  }


  const fetchProperties = async()=>{
     try {
         const response = await axios.get(baseurl +'/api/properties/getProperties');
         console.log(response.data)

         if(response.data){
          setProperties(response.data)
         }
         
     } catch (error) {
       console.log(error)
     }
  }


  const handleChange = (values) => {
    setSelectedLocation(values);
      console.log(values);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    const filtered = properties.filter((property) => property.location?._id === value);
    setFilteredProperties(filtered);
  };

  console.log("filteredProperties",filteredProperties);


  const handlePropertiesChange = (value) => {
    console.log('Selected Properties:', value);
  };
  

  const handleAdd = () => {
    setEditingTrendingProperties(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingTrendingProperties(record);
    form.setFieldsValue({
      country:record.country,
      state:record.state,
      city:record.city,
      sector:record.sector,
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
        "http://localhost:5000/api/amenities/uploadImage",
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
   

    console.log(values);

    const postdata={
      country:values.country,
      state:values.state,
      city:values.city,
      sector:values.sector,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.post(baseurl+'/api/locations/createlocation',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Location created successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchTrendingProperties()
      }
    
    // sdkhbfkshdbfk

      
   

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
    const postdata={
      country:values.country,
      state:values.state,
      city:values.city,
      sector:values.sector,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.put(`${baseurl}/api/locations/updatelocation/${editingTrendingProperties._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Location update successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchAllLocation()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingTrendingProperties) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: "Location",
      dataIndex: ['location','city'],
      key: "country",
    },


    {
      title: "Properties Name",
      dataIndex: 'properties',
      render: (_, record) => (
           <>
 {record?.properties?.map((item, index) => (
        <span key={index}>
          {item?.propertiesName}
          {index !== record?.properties?.length - 1 && ', '}
        </span>
      ))}
           </>
      )
    },
    


    {
      title: "Status",
      key: "Status",
      render: (_, record) => (
        <Switch
          checked={record.Status === "Active"}
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
        Add Trending Properties
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingTrendingProperties ? 'Edit TrendingProperties' : 'Add TrendingProperties'}
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
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please select the allowed locations!' }]}
      >
        <Select
          // mode="multiple"
          placeholder="Select Location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          
          {location?.map(loc => (
            <Option key={loc.id} value={loc._id}>
              {loc.city}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
  label="Properties"
  name="properties"
  rules={[{ required: true, message: 'Please select the properties!' }]}
>
  <Select
    mode="multiple" // Enables multiple select
    placeholder="Select Properties"
    value={selectedLocation}
    onChange={handlePropertiesChange}
  >
         {filteredProperties?.map((property) => (
            <Option key={property._id} value={property._id}>
              {property.propertiesName}
            </Option>
          ))}
  </Select>
      </Form.Item>


              <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTrendingProperties ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default TrendingProperties;
