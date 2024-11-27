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


const NeighbourhoodData = [
  { id: 1, name: "Marbal", value: "Marbal" },
  { id: 1, name: "Granite", value: "Granite" },
  
]

const Neighbourhood = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNeighbourhood, setEditingNeighbourhood] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");




  const [val, setVal] = useState([{ type: '' }]);

  // Handle add new input field
  const handleAdd1 = () => {
    setVal([...val, { type: '' }]); // Add an empty object for the new input
  };

  // Handle input change
  const handleChange1 = (e, i) => {
    const newData = [...val];
    newData[i].type = e.target.value; // Update the specific input value in the array
    setVal(newData);
  };

  // Handle delete input field
  const handleDelete = (i) => {
    const newData = val.filter((_, index) => index !== i); // Remove the specific input field
    setVal(newData);
  };




  
  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchNeighbourhood();
  }, []);

  const fetchNeighbourhood = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/neighbourhood/getNeighborhood')
       console.log(respons.data.newNeighborhood);

       if(respons.data.success){
        setData(respons.data.newNeighborhood);
        // message.success('Neighbourhood fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Neighbourhood:', error);
      message.error('Error fetching Neighbourhood.');
    } finally {
      setLoading(false);
    }
  };


  const handleStatusToggle = async(record)=>{
    try {
       const response = await axios.patch(`${baseurl}/api/neighbourhood/toggled/${record._id}`)
       console.log(response)

       if(response){
        message.success("Status updated succesfully")
        fetchNeighbourhood()
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
    setEditingNeighbourhood(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true)
    setEditingNeighbourhood(record);
    form.setFieldsValue({
      name:record.name,
    });
    setIsModalOpen(true);
  };



 


  const type = val.map((item)=>{
    return item.type;
})


const Isdata = type.map((item)=>{
       const returndata = {
           value:item
       }

       return  returndata;
})

console.log("is data is",Isdata)




  const handlePost = async(values)=>{
   
  
    const type = val.map((item)=>{
        return item.type;
    })

   
    const object = type.map(item => {
      return { value: item };
  });
    

    const postdata={
      name:values.name,
      type:object,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.post(baseurl+'/api/neighbourhood/createNeighborhood',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Neighbourhood created successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchNeighbourhood()
        setVal([{type:''}])
      }
    
    // sdkhbfkshdbfk

      
   

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
    const type = val.map((item)=>{
        return item.type;
    })

    const object = type.map(item => {
      return { value: item };
  });

    const postdata={
      name:values.name,
      type:object,
      createdBy:auth.user._id,
    }
     

    try {
      const response = await axios.put(`${baseurl}/api/neighbourhood/updateNeighborhood/${editingNeighbourhood._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Neighbourhood update successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        setVal([{type:''}])
        fetchNeighbourhood()
      }

  } catch (error) {
    console.log(error)
  }
  }
  const handleSubmit = async (values) => {
    if (editingNeighbourhood) {
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
        title: "Type",
        // dataIndex: "locations",
        key: "type",
        render: (_, record) => (
  
             <>
               {
                record?.type?.map((item)=>{
                    return(
                      <>
  
                      <span>{item.value},</span>
                      </>
                    )
                })
               }
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
        Add Neighbourhood
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />


       <Modal
        title={editingNeighbourhood ? 'Edit Flooring' : 'Add Flooring'}
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
            rules={[{ required: true, message: 'Please input the Name!' }]}
            
           >
            <Input  placeholder="Enter Name"/>
          </Form.Item>


          {val.map((data, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <Form.Item
            name={`type-${i}`}
            label={`Type ${i + 1}`}
            rules={[{ required: true, message: 'Please input the Type!' }]}
            style={{ flex: 1 }}
          >
            <Input
              placeholder="Enter Type"
              value={data.type}
              onChange={(e) => handleChange1(e, i)}
            />
          </Form.Item>
          <Button
            type="danger"
            onClick={() => handleDelete(i)}
            style={{ marginLeft: 10 ,fontWeight:"bold",fontSize:"2rem",color:"red"}}
          >
            x
          </Button>
        </div>
      ))}

      <Button type="dashed" onClick={handleAdd1}    style={{ marginLeft: 16 ,marginBottom:"10px"}}>
        Add
      </Button>



              <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingNeighbourhood ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Neighbourhood;
