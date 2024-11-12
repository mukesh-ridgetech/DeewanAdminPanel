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


// abhi iskon karan h ye abhi huwa nahi h iska code facing se liya hu but we
// we have to create it soon



const Transition = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransition, setEditingTransition] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [neighourHooddata,setNeighbourHooddata] = useState();
  const[location,setLocation] = useState();
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationId1, setSelectedLocationId1] = useState(null);



  // console.log("auth is ",auth?.user?._id);

  const handleLocationChange = (value) => {
    setSelectedLocationId(value);  // Update selected location ID
  };

  const handleLocationChange1 = (value) => {
    setSelectedLocationId1(value);  // Update selected location ID
  };

  
  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchTransition();
    fetchNeighbour();
    fetchLocation();
  }, []);

  const fetchTransition = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/transition/getTransition')
    //    console.log(respons.data.newFacing);
    // console.log("respons.data.transitions",respons.data.transitions)
       if(respons.data){
        setData(respons.data.transitions);
        // message.success('Fencing fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Fencing:', error);
      message.error('Error fetching Fencing.');
    } finally {
      setLoading(false);
    }
  };


  const fetchNeighbour = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/neighbourhood/getNeighborhood')
    //    console.log(respons.data.newFacing);
    console.log("respons.data",respons.data.newNeighborhood)
       if(respons.data){
        setNeighbourHooddata(respons.data.newNeighborhood);
        // console.log("respons.data.transitions",respons.data.transitions)
        // message.success('Fencing fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Fencing:', error);
      message.error('Error fetching Fencing.');
    } finally {
      setLoading(false);
    }
  };




  const fetchLocation = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/locations/getLoacation')
       console.log("location",respons.data.locations);

       if(respons.data.success){
        // setData(respons.data.transitions);
        setLocation(respons.data.locations);
        // message.success('Fencing fetched successfully!');
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
       const response = await axios.patch(`${baseurl}/api/transition/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchTransition()
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
    setEditingTransition(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)

    console.log("record is",record)
    setEditingTransition(record);

    // locations:values.location,
    // createdBy:auth?.user?._id,
    // type:values.neighbour,
    // LankMarkName:values.landMark,
    const location = record?.locations?.country +" - " + record?.locations?.state +" - " + record?.locations?.city;
    form.setFieldsValue({
      location:location,
      landMark:record?.LankMarkName
    });

     setSelectedLocationId(record?.locations?._id);
    setIsModalOpen(true);
  };



  


  const handlePost = async(values)=>{
   

    console.log(values);

    // "locations":"6710ef443301c55c2a67c35e",
    // "createdBy":"6710ce69300af26fe95b152a",
    // "type":"67178808c06a8519cd77000c",
    // "value":"hospital distance"

    const postdata={
      locations:values.location,
      createdBy:auth?.user?._id,
      type:values.neighbour,
      LankMarkName:values.landMark,

    }
     

    try {
      const response = await axios.post(baseurl+'/api/transition/createTransition',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Transition created successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        form.resetFields();
        fetchTransition()
      }
    
    // sdkhbfkshdbfk

      
   

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
    const postdata={
      locations:selectedLocationId,
      createdBy:auth?.user?._id,
      type:values.neighbour,
      LankMarkName:values.landMark,

    }
     

    try {
      const response = await axios.put(`${baseurl}/api/transition/updateTransition/${editingTransition._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Furnihed update successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        form.resetFields();
        fetchTransition()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingTransition) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: "Transiton Name",
      dataIndex: "neighborhoodName",
      key: "neighborhoodName",
    },

    {
        title: "Transiton Type",
        dataIndex: "neighborhoodType",
        key: "neighborhoodType",
      },

      {
        title: "LankMarkName",
        dataIndex: "LankMarkName",
        key: "LankMarkName",
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
        Add Transition
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingTransition ? 'Edit Transition' : 'Add Transition'}
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
        label="NeighbourHood"
        name="neighbour"
        rules={[{ required: true, message: 'Please select the name!' }]}
      >
        <Select
          // mode="multiple"
          placeholder="Select NeighbourHood Type"
          value={selectedLocationId1}  // Set current location ID
          onChange={handleLocationChange1}
        >
          
          {neighourHooddata?.map((loc) =>
            loc?.type?.map((typeItem) => (
              <Option key={typeItem._id} value={typeItem._id}>
               {loc?.name} - {typeItem.value}
              </Option>
            ))
          )}
        </Select>
      

      
      </Form.Item>

      <Form.Item
      label="Location"
      name="location"
      value={selectedLocationId}  // Set current location ID
      onChange={handleLocationChange}
      rules={[{ required: true, message: 'Please select the name!' }]}
      >
       
      <Select
          // mode="multiple"
          label="Location"
          name="location"
          placeholder="Select Location"
          value={selectedLocation}
          onChange={handleChange}
        >
          
          {location?.map(loc => (
            <Option key={loc._id} value={loc._id}>
              {loc?.country} - {loc?.state} - {loc?.city}
            </Option>
          ))}
        </Select>

      </Form.Item>

      <Form.Item
        label="Land Mark"
        name="landMark"
        rules={[{ required: true, message: 'Please input your name!' }]} // Validation rule
      >
        <Input placeholder="Enter LandMark" />
      </Form.Item>


              <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTransition ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Transition;
