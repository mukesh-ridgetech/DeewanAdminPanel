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


const indiaStates = [
  { id: 1, name: "Andhra Pradesh", value: "andhra-pradesh" },
  { id: 2, name: "Arunachal Pradesh", value: "arunachal-pradesh" },
  { id: 3, name: "Assam", value: "assam" },
  { id: 4, name: "Bihar", value: "bihar" },
  { id: 5, name: "Chhattisgarh", value: "chhattisgarh" },
  { id: 6, name: "Goa", value: "goa" },
  { id: 7, name: "Gujarat", value: "gujarat" },
  { id: 8, name: "Haryana", value: "haryana" },
  { id: 9, name: "Himachal Pradesh", value: "himachal-pradesh" },
  { id: 10, name: "Jharkhand", value: "jharkhand" },
  { id: 11, name: "Karnataka", value: "karnataka" },
  { id: 12, name: "Kerala", value: "kerala" },
  { id: 13, name: "Madhya Pradesh", value: "madhya-pradesh" },
  { id: 14, name: "Maharashtra", value: "maharashtra" },
  { id: 15, name: "Manipur", value: "manipur" },
  { id: 16, name: "Meghalaya", value: "meghalaya" },
  { id: 17, name: "Mizoram", value: "mizoram" },
  { id: 18, name: "Nagaland", value: "nagaland" },
  { id: 19, name: "Odisha", value: "odisha" },
  { id: 20, name: "Punjab", value: "punjab" },
  { id: 21, name: "Rajasthan", value: "rajasthan" },
  { id: 22, name: "Sikkim", value: "sikkim" },
  { id: 23, name: "Tamil Nadu", value: "tamil-nadu" },
  { id: 24, name: "Telangana", value: "telangana" },
  { id: 25, name: "Tripura", value: "tripura" },
  { id: 26, name: "Uttar Pradesh", value: "uttar-pradesh" },
  { id: 27, name: "Uttarakhand", value: "uttarakhand" },
  { id: 28, name: "West Bengal", value: "west-bengal" },
  { id: 29, name: "Andaman and Nicobar Islands", value: "andaman-nicobar-islands" }, // Union Territory
  { id: 30, name: "Chandigarh", value: "chandigarh" },                                // Union Territory
  { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu", value: "dadra-nagar-haveli-daman-diu" }, // Union Territory
  { id: 32, name: "Lakshadweep", value: "lakshadweep" },                              // Union Territory
  { id: 33, name: "Delhi", value: "delhi" },                                          // Union Territory and National Capital Territory
  { id: 34, name: "Puducherry", value: "puducherry" },                                // Union Territory
  { id: 35, name: "Ladakh", value: "ladakh" },                                        // Union Territory
  { id: 36, name: "Jammu and Kashmir", value: "jammu-kashmir" }                       // Union Territory
];



const Location = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
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
    fetchAllLocation();
  }, []);

  const fetchAllLocation = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/locations/getLoacation')
       console.log(respons.data.locations);

       if(respons.data.success){
        setData(respons.data.locations);
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



  const handleStatusToggle = async(record)=>{
    try {
       const response = await axios.patch(`${baseurl}/api/locations/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status Updated Succesfully")
        fetchAllLocation()
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
    setEditingLocation(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingLocation(record);
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
        fetchAllLocation()
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
      const response = await axios.put(`${baseurl}/api/locations/updatelocation/${editingLocation._id}`,postdata);
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
    if (editingLocation) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },


    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
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
        Add Location
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingLocation ? 'Edit Amenties' : 'Add Amenties'}
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
        label="Country"
        name="country"
        rules={[{ required: true, message: 'Please select the allowed locations!' }]}
      >
        <Select
          // mode="multiple"
          placeholder="Select Country"
          value={selectedLocation}
          onChange={handleChange}
        >
          
          {countryIndia.map(loc => (
            <Option key={loc.id} value={loc.value}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

          <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: 'Please select the allowed locations!' }]}
      >
        <Select
          // mode="multiple"
          placeholder="Select State"
          value={selectedLocation}
          onChange={handleChange}
        >
          
          {indiaStates.map(loc => (
            <Option key={loc.id} value={loc.value}>
              {loc.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
             
        
           <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please input the city!' }]}
            
          >
            <Input  placeholder="Enter City"/>
          </Form.Item>


          <Form.Item
            name="sector"
            label="Sector"
            rules={[{ required: true, message: 'Please input the Sector!' }]}
            
           >
            <Input  placeholder="Enter Sector"/>
          </Form.Item>
          


              <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingLocation ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Location;
