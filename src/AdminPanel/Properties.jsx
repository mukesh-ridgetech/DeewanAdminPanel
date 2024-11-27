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
  InputNumber,
  Space, 
  List,
  Spin
 
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { BellOutlined,TranslationOutlined ,TruckOutlined ,CloseCircleOutlined } from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import { baseurl } from "../helper/Helper";
import axios from "axios";
import Password from "antd/es/input/Password";
// import { baseurl } from "../helper/Helper";
import { useAuth } from "../context/auth";
import Dragger from "antd/es/upload/Dragger";


const Properties = ({setSelectedTab,setId}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperties, setEditingProperties] = useState(null);
  const[image1,setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue,setImageTrue] = useState(false)
  const [builderLogo,setBuilderLogo] = useState()
  const[amentis,setAmenties] = useState();
  const[location,setLocation] = useState();
  const [overview1,setOverview] = useState();
  const[builder,setBuilder] = useState()
  const[furnish,setfurnish] = useState()
  const[builderName,setBuilderName] = useState();
  const[locationName,setLocationName] = useState()
  const[amintiesName,setAmentiesName] = useState();
  const [record1, setRecord] = useState();
  const[cross,setCross] = useState(true);
  

  console.log(auth.user._id);



  const handleRowClick = (record) => {
    console.log("Clicked row data:", record);
    setRecord(record);
    setImage(record?.camelliasImage);
    setCross(true);
    // Access the clicked row's data here
    // You can now use 'record' to get the details of the clicked row
  };

  
  const handleCross = ()=>{
    setCross(false);
  }


// for floor type 

const [floortypes, setFloortypes] = useState([]);
// Handler to update floortypes when a new entry is added
const handleAddFloorType = () => {
  setFloortypes([
    ...floortypes,
    { bhk: '', Area: '', price: 0 }, // Default values for new floor type
  ]);
};

// Handler to update the specific floor type entry in the state
const handleFloorTypeChange = (index, field, value) => {
  const updatedFloortypes = [...floortypes];
  updatedFloortypes[index][field] = value;
  setFloortypes(updatedFloortypes); // Update state
};

// Handler to remove a floor type from the state
const handleRemoveFloorType = (index) => {
  const updatedFloortypes = floortypes.filter((_, i) => i !== index);
  setFloortypes(updatedFloortypes); // Update state
};



// for NeighboutHood
const [neighbourhoods, setNeighbourhoods] = useState([
    {
      type: '',
      Transition: [
        {
          TypeOfType: '',
          value: [{ landMark: '', distance: '', time: '' }],
        },
      ],
    },
  ]);

  console.log("neighbourhoods",neighbourhoods)

  // Add a new neighbourhood object to the state
  const handleAddNeighbourhood = () => {
    setNeighbourhoods([
      ...neighbourhoods,
      {
        type: '',
        Transition: [{ TypeOfType: '', value: [{ landMark: '', distance: '', time: '' }] }], // Properly initialize Transition
      },
    ]);
  };

  // Update a field in the neighbourhood object
  const handleNeighbourhoodChange = (index, field, value) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    if (updatedNeighbourhoods[index]) {
      updatedNeighbourhoods[index][field] = value;
      setNeighbourhoods(updatedNeighbourhoods);
    }
  };

  // Add a new Transition to the specific neighbourhood
  const handleAddTransition = (index) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    updatedNeighbourhoods[index].Transition.push({
      TypeOfType: '',
      value: [{ landMark: '', distance: '', time: '' }],
    });
    setNeighbourhoods(updatedNeighbourhoods);
  };

  // Add a new 'value' (landMark, distance, time) inside a Transition
  const handleAddValue = (neighbourhoodIndex, transitionIndex) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    updatedNeighbourhoods[neighbourhoodIndex].Transition[transitionIndex].value.push({
      landMark: '',
      distance: '',
      time: '',
    });
    setNeighbourhoods(updatedNeighbourhoods);
  };

  // Update specific fields in the Transition value
  const handleTransitionValueChange = (
    neighbourhoodIndex,
    transitionIndex,
    valueIndex,
    field,
    value
  ) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    const transition = updatedNeighbourhoods[neighbourhoodIndex]?.Transition[transitionIndex];
  
    if (transition) {
      if (valueIndex === undefined) {
        // Directly update the TypeOfType field
        transition[field] = value;
      } else if (transition.value[valueIndex]) {
        // Update the value field if valueIndex is provided
        transition.value[valueIndex][field] = value;
      }
      setNeighbourhoods(updatedNeighbourhoods);
    }
  };
  

  // Remove a neighbourhood from the array
  const handleRemoveNeighbourhood = (index) => {
    const updatedNeighbourhoods = neighbourhoods.filter((_, i) => i !== index);
    setNeighbourhoods(updatedNeighbourhoods);
  };

  // Remove a transition from a neighbourhood
  const handleRemoveTransition = (neighbourhoodIndex, transitionIndex) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    updatedNeighbourhoods[neighbourhoodIndex].Transition = updatedNeighbourhoods[neighbourhoodIndex].Transition.filter((_, i) => i !== transitionIndex);
    setNeighbourhoods(updatedNeighbourhoods);
  };

  // Remove a value (landMark, distance, time) from a transition
  const handleRemoveValue = (neighbourhoodIndex, transitionIndex, valueIndex) => {
    const updatedNeighbourhoods = [...neighbourhoods];
    updatedNeighbourhoods[neighbourhoodIndex].Transition[transitionIndex].value = updatedNeighbourhoods[neighbourhoodIndex].Transition[transitionIndex].value.filter((_, i) => i !== valueIndex);
    setNeighbourhoods(updatedNeighbourhoods);
  };




//   for overview 
const [overviews, setOverviews] = useState([]);

console.log("overviews",overviews);
// Function to add a new overview field
const handleAddOverview = () => {
  setOverviews([
    ...overviews,
    {
      name: '', // Initially empty, selected from MasterName collection
      value: '',
      pageType: 'Overview', // Default value for pageType
      inputType: 'text', // Default input type
    },
  ]);
};

// Function to handle field changes
// const handleOverviewChange = (index, field, value) => {
//   const updatedOverviews = [...overviews];
//   updatedOverviews[index][field] = value;
//   setOverviews(updatedOverviews);
// };

const handleOverviewChange = (index, key, value) => {
  const updatedOverview = [...overviews];
  updatedOverview[index][key] = value;
  setOverviews(updatedOverview);
};


// Function to remove an overview field
const handleRemoveOverview = (index) => {
  const updatedOverviews = overviews.filter((_, i) => i !== index);
  setOverviews(updatedOverviews);
};



const [dropdownOptions, setDropdownOptions] = useState([]);
const [dropdownLoading, setDropdownLoading] = useState(false);
const handleCategoryChange = async (index, category) => {
  // Update the category in the overview state
  handleOverviewChange(index, 'category', category);

  // Fetch data based on category
  setDropdownLoading(true);
  try {
    const response = await fetchDropdownData(category);
    const options = response.data.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    setDropdownOptions(options);
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
    setDropdownOptions([]);
  } finally {
    setDropdownLoading(false);
  }
};

const fetchDropdownData = async (category) => {
  const apiEndpoints = {
    furnished: `${baseurl}/api/furnished/getFurnished`,
    flooring: `${baseurl}/api/fencing/getFacing`,
  };

  if (!apiEndpoints[category]) {
    throw new Error(`Invalid category: ${category}`);
  }

  const response = await axios.get(apiEndpoints[category]);
  return response;
};




//   for image array
const [images, setImages] = useState([]);

// Handle image upload and store URL in state
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file.file);

  try {
    const response = await axios.post( `${baseurl}/api/amenities/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.imageUrl) {
      // Store the image URL in the state array
      setImages((prevImages) => [...prevImages, response.data.imageUrl]);
      message.success('Image uploaded successfully!');
    } else {
      message.error('Image upload failed!');
    }
  } catch (error) {
    message.error('Error uploading image!');
  }

  return false; // Prevent default upload behavior
};


// console.log("images",images);
// Remove an image URL from the array
const removeImage = (url) => {
  setImages((prevImages) => prevImages.filter((image) => image !== url));
};




// for Tag
const [tags, setTags] = useState([{ value: '' }]); // Initial state with one tag object

// Add a new tag
const handleAddTag = () => {
  setTags([...tags, { value: '' }]);
};

// Remove a tag
const handleRemoveTag = (index) => {
  const updatedTags = tags.filter((_, i) => i !== index);
  setTags(updatedTags);
};

// Handle tag value change
const handleTagChange = (index, newValue) => {
  const updatedTags = [...tags];
  updatedTags[index].value = newValue;
  setTags(updatedTags);
};




// for map center
const [mapCenter, setMapCenter] = useState([0, 0]); // Initial state with two numbers (e.g., latitude and longitude)

  // Add a new coordinate (number)
  const handleAddCoordinate = () => {
    setMapCenter([...mapCenter, 0]); // Add a default value (0) for the new coordinate
  };

  // Remove a coordinate
  const handleRemoveCoordinate = (index) => {
    const updatedMapCenter = mapCenter.filter((_, i) => i !== index);
    setMapCenter(updatedMapCenter);
  };

  // Handle coordinate value change
  const handleCoordinateChange = (index, value) => {
    const updatedMapCenter = [...mapCenter];
    updatedMapCenter[index] = value;
    setMapCenter(updatedMapCenter);
  };



  const handleCardClick = (id,tabKey) =>
    {
        setSelectedTab(tabKey);
        setId(id)
    };
  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchAllProperties();
    fetchAllAmenties();
    fetchAllLocation();
    fetchAllOverview();
    fetchAllBuilder();
    fetchfurnish()
  }, []);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/properties/getProperties')
       console.log(respons.data);

       if(respons.data){
        setData(respons.data);
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

  const fetchAllAmenties = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/amenities/getAmenties')
       console.log("amentris data",respons.data.amenities);

       if(respons.data){
        setAmenties(respons.data.amenities);
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


  const fetchAllLocation = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/locations/getLoacation')
       console.log("location data",respons.data.locations);

       if(respons.data){
        setLocation(respons.data.locations);
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


  const fetchAllOverview = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/overviews/getOverview')
       console.log("overview data",respons.data.overviews);

       if(respons.data){
        setOverview(respons.data.overviews);
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


  const fetchAllBuilder = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/builders/getBuilder')
       console.log("builder data",respons.data.builders);

       if(respons.data){
        setBuilder(respons.data.builders);
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



  const fetchfurnish = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/furnished/getFurnished')
       console.log("builder data",respons.data.newFurnished);

       if(respons.data){
        setfurnish(respons.data.newFurnished);
        // message.success('Amenities fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Amenities:', error);
      // message.error('Error fetching Amenities.');
    } finally {
      setLoading(false);
    }
  };



  const fetchparking = async () => {
    setLoading(true);
    try {
       const respons = await axios.get( baseurl+'/api/parking/getParking')
       console.log("builder data",respons.data.newFurnished);

       if(respons.data){
        // setfurnish(respons.data.newFurnished);
        // message.success('Amenities fetched successfully!');
       }
     
    //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error('Error fetching Amenities:', error);
      // message.error('Error fetching Amenities.');
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
    setMapCenter([]);
    setTags([])
    setOverviews([]);
    setFloortypes([]);
    setImages([])
    setNeighbourhoods([]);
    setEditingProperties(null);
    form.resetFields();
    setIsModalOpen(true);
  };


  const handleEdit = (record) => {
    // Set static fields
    setEditingProperties(record)
    setBuilderName(record?.builder);
    setAmentiesName(record?.amenities);
    setLocationName(record?.location);
    const Buildername = record?.builder?._id
    const city = record?.location?._id
    form.setFieldsValue({
      propertiesName: record.propertiesName,
      builder: Buildername,
      location: city,
      amenities: record.amenities.map((item) => item._id),
      description: record.description,
      // floorPlan: record.floorPlan,
      address: record.address,
      price: record.price,
      propertiesType: record.propertiesType,
      propertiesCategory: record.propertiesCategory,
      propertiesStatus: record.propertiesStatus,
      propertiesAge: record.propertiesAge,
      bhkType: record.bhkType,
      mapCenter:record?.mapCenter
    });
  
    // Set dynamic fields for overviews
    if (record.overview) {
      setOverviews(record.overview);
    }
  
    // Set dynamic fields for floortypes
    if (record.floortypes) {
      setFloortypes(record.floortypes);
    }

    if(record?.tag){
      var tagArray = []
      record.tag.map((item)=>{
          tagArray.push({value:item.value})
      })
      setTags(tagArray)
    }
  
    // Set dynamic fields for neighbourhoods
    if (record.neighbourhood) {
      setNeighbourhoods(record.neighbourhood);
    }

    if(record.images){
      setImages(record.images)
    }

    if(record.mapCenter){
      setMapCenter(record?.mapCenter);
    }
  
    setIsModalOpen(true); // Open the modal for editing
  };
  


  // const handleEdit = (record) => {
  //   setImageTrue(true)
  //   setEditingAmenties(record);
  //   form.setFieldsValue({
  //     name: record.name,
      
  //   });
  //   setIsModalOpen(true);
  // };



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


  const uploadImage1 = async (file) => {
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
        setBuilderLogo(response.data.imageUrl);
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
    //   logo:image1,
      builder:values.builder,
      location:values.location,
      propertiesName:values.propertiesName,
      description:values.description,
      address:values.address,
      price:values.price,
      propertiesType:values.propertiesType,
      propertiesCategory:values.propertiesCategory,
      propertiesStatus:values.propertiesStatus,
      propertiesAge:values.propertiesAge,
      amenities:values.amenities,
      bhkType:values.bhkType,
      images:images,
      overview:overviews,
      neighbourhood:neighbourhoods,
      tag:tags,
      mapCenter:mapCenter,
      camelliasImage:image1,
      builderLogo:builderLogo,
      floortypes:floortypes,
      createdBy:auth.user._id,
    }
     

    // console.log("postdata",postdata);

    try {
      const response = await axios.post(baseurl+'/api/properties/cretePropeties',postdata);
      console.log(response.data);

      if(response.data){
        message.success("Properties Created Successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchAllProperties()
      }
    

  } catch (error) {
    console.log(error)
  }

  }

  const handlePut = async(values)=>{
       
   console.log(amentis,values.amenities)
   values.amenities= amentis
  .filter((amenity) => values?.amenities?.includes(amenity._id)) // Filter amenities matching names in a1
  .map((amenity) => amenity._id); // Map the filtered amenities to their IDs
  
  // console.log(overviews);
  const overviewArray = [];
  overviews?.forEach((item) => {
    const newItem = {
      ...item,
      name: item?.name?._id || item?.name, // Fallback to item.name if _id doesn't exist
    };
    delete newItem._id; // Remove the _id property from the new object
    overviewArray.push(newItem); // Push the modified item into the array
  });
  


  console.log(overviewArray)


  const BuilderId = builderName?._id
    const postdata={
      builder:values.builder,
      location:values.location,
      propertiesName:values.propertiesName,
      description:values.description,
      address:values.address,
      price:values.price,
      propertiesType:values.propertiesType,
      propertiesCategory:values.propertiesCategory,
      propertiesStatus:values.propertiesStatus,
      propertiesAge:values.propertiesAge,
      amenities:values.amenities,
      bhkType:values.bhkType,
      images:images,
      overview:overviewArray,
      neighbourhood:neighbourhoods,
      tag:tags,
      mapCenter:mapCenter,
      camelliasImage:image1,
      // builderLogo:builderLogo,
      floortypes:floortypes,
      createdBy:auth.user._id,
    }
     
    console.log("values is now",postdata)

    try {
      const response = await axios.put(`${baseurl}/api/properties/updatePropeties/${editingProperties._id}`,postdata);
      console.log(response.data);

      if(response.data){
        message.success("Properties Updated Successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchAllProperties()
      }

  } catch (error) {
    console.log(error)
  }
  }


  const handleSubmit = async (values) => {
    if (editingProperties) {
      await handlePut(values);
    } else {
      await handlePost(values);
    }
  };

  const columns = [
    {
      title: "Properties Name",
      dataIndex: "propertiesName",
      key: "name",
    },


    {
        title: "Properties Type",
        dataIndex: "propertiesType",
        key: "propertiesType",
      },


      {
        title: "Properties Category",
        dataIndex: "propertiesCategory",
        key: "propertiesCategory",
      },


      {
        title: "Properties Status",
        dataIndex: "propertiesStatus",
        key: "propertiesStatus",
      },



     

      {
        title: "Builder Name",
        dataIndex: ['builder','name'],
        key: "name",
      },

      {
        title: "Location",
        dataIndex: ['location','sector'],
        key: "name",
      },




    // {
    //     title: "Builder Logo",
    //     dataIndex: "builderLogo",
    //     key: "builderLogo",
    //     render: (_, record) => (
  
    //           <>
    //           <img src={`${baseurl}${record?.builderLogo}`} alt="" style={{width:"40px"}}/>
    //           </>
    //     ),
    //   },

    //   {
    //     title: "Floor Plan Image",
    //     dataIndex: "floorPlan",
    //     key: "builderLogo",
    //     render: (_, record) => (
  
    //           <>
    //           <img src={`${baseurl}${record?.floorPlan}`} alt="" style={{width:"40px"}}/>
    //           </>
    //     ),
    //   },


    // {
    //   title: "Status",
    //   key: "Status",
    //   render: (_, record) => (
    //     <Switch
    //       checked={record.Status === "Active"}
    //       onChange={() => handleStatusToggle(record)}
    //       checkedChildren="Active"
    //       unCheckedChildren="Inactive"
    //     />
    //   ),
    // },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button style={{width:"115px"}} onClick={() => handleEdit(record)}>Update</Button>
          <br></br>
          <br></br>
          <Button onClick={() => handleCardClick(record?._id, 'properties-details')}>View Details</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Properties
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
        scroll={{ x: 'max-content' }}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record); // Trigger the click handler
          },
        })}
      />


       <Modal
        title={editingProperties ? 'Edit Amenties' : 'Add Amenties'}
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
            name="propertiesName"
            label="Properties Name"
            rules={[{ required: true, message: 'Please Input the Properties Name!' }]}
            
          >
            <Input  />
          </Form.Item>

          
             
        <Form.Item
        label="builder"
        name="builder"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select >
          {builder?.map(option => (
            <Option key={option.value} value={option._id}>
              {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>  

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select >
          {location?.map(option => (
            <Option key={option.value} value={option._id}>
              {option.sector}
            </Option>
          ))}
        </Select>
      </Form.Item> 

      <Form.Item
  label="Amenities"
  name="amenities"
  rules={[{ required: true, message: 'Please select at least one option!' }]}
>
  <Select
    mode="multiple"  // Enables multiple selection
    // placeholder="Choose options"
  >
    {amentis?.map(option => (
      <Select.Option key={option._id} value={option._id}>
        {option.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>


<Form.Item
  name="description"
  label="Description"
  rules={[{ required: true, message: 'Please Input the Properties Description!' }]}
>
  <Input.TextArea
    // placeholder="Enter Properties Description"
    rows={4}  // Adjust the number of rows if necessary
  />
</Form.Item>


{/* <Form.Item
  name="floorPlan"
  label="Floor Plan"
  rules={[{ required: true, message: 'Please Input the Properties Floor Plan!' }]}
>
  <Input
    // placeholder="Enter Properties "
    rows={4}  // Adjust the number of rows if necessary
  />
</Form.Item> */}


<Form.Item
  name="address"
  label="Address"
  rules={[{ required: true, message: 'Please Input the Properties Floor Plan!' }]}
>
  <Input
    // placeholder="Enter Properties "
    rows={4}  // Adjust the number of rows if necessary
  />
</Form.Item>


<Form.Item
  name="price"
  label="Price"
  rules={[{ required: true, message: 'Please Input the Price!' }]}
>
  <InputNumber
    // placeholder="Enter Properties Price"
    style={{ width: '100%' }}  // Optional: make it full width like Input
    min={0}  // Optional: you can set a minimum value, e.g., no negative prices
  />
</Form.Item>

<Form.Item
  name="propertiesType"
  label="Properties Type"
  rules={[{ required: true, message: 'Please select the property type!' }]}
>
  <Select placeholder="Select Property Type">
    <Select.Option value="rent">Rent</Select.Option>
    <Select.Option value="sell">Sell</Select.Option>
    <Select.Option value="both">Both</Select.Option>
  </Select>
</Form.Item>


<Form.Item
  name="propertiesCategory"
  label="Properties Category"
  rules={[{ required: true, message: 'Please select the property category!' }]}
>
  <Select placeholder="Select Property Category">
    <Select.Option value="Residential">Residential</Select.Option>
    <Select.Option value="Commercial">Commercial</Select.Option>
    <Select.Option value="Rental">Rental</Select.Option>
  </Select>
</Form.Item>


<Form.Item
  name="propertiesStatus"
  label="Properties Status"
  rules={[{ required: true, message: 'Please select the property status!' }]}
>
  <Select placeholder="Select Property Status">
    <Select.Option value="Ready to Move">Ready to Move</Select.Option>
    <Select.Option value="Under Construction">Under Construction</Select.Option>
  </Select>
</Form.Item>


<Form.Item
  name="propertiesAge"
  label="Properties Age"
  rules={[{ required: true, message: 'Please input the property age!' }]}
>
  <InputNumber
    placeholder="Enter property age"
    min={0}  // Optional: Set a minimum value, e.g., no negative age
    style={{ width: '100%' }}  // Make it full-width like Input
  />
</Form.Item>


<Form.Item
  name="bhkType"
  label="BHK Type"
  rules={[{ required: true, message: 'Please input the BHK type!' }]}
>
  <Input placeholder="Enter BHK type (e.g., 1BHK, 2BHK)" />
</Form.Item>



  {/* Dynamic array for floortypes */}
  {floortypes.map((floor, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item
            label="BHK"
            rules={[{ required: true, message: 'Please input BHK!' }]}
          >
            <Input
              value={floor.bhk}
              onChange={(e) => handleFloorTypeChange(index, 'bhk', e.target.value)}
              placeholder="e.g. 2BHK"
            />
          </Form.Item>

          <Form.Item
            label="Area"
            rules={[{ required: true, message: 'Please input area!' }]}
          >
            <Input
              value={floor.Area}
              onChange={(e) => handleFloorTypeChange(index, 'Area', e.target.value)}
              placeholder="Enter area (in sq. ft.)"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <InputNumber
              value={floor.price}
              onChange={(value) => handleFloorTypeChange(index, 'price', value)}
              placeholder="Enter price"
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>

          <Button
            type="link"
            onClick={() => handleRemoveFloorType(index)}
            icon={<MinusCircleOutlined />}
          >
            Remove
          </Button>
        </Space>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={handleAddFloorType}
          icon={<PlusOutlined />}
        >
          Add Floor Type
        </Button>
      </Form.Item>




      {/* for NeighbourHood */}
      {/* Loop through neighbourhoods */}
      {neighbourhoods.map((neighbourhood, neighbourhoodIndex) => (
        <div key={neighbourhoodIndex} style={{ marginBottom: '20px' }}>
          {/* Neighbourhood Type */}
          <Form.Item label="Neighbourhood Type" required>
            <Input
              value={neighbourhood.type}
              onChange={(e) => handleNeighbourhoodChange(neighbourhoodIndex, 'type', e.target.value)}
              placeholder="e.g. Residential"
            />
          </Form.Item>

          {/* Loop through Transitions */}
          {neighbourhood.Transition.map((transition, transitionIndex) => (
            <div key={transitionIndex} style={{ marginLeft: '20px', marginBottom: '10px' }}>
              <Form.Item label="Type of Type" required>
  <Input
    value={transition.TypeOfType}
    onChange={(e) =>
      handleTransitionValueChange(neighbourhoodIndex, transitionIndex, undefined, 'TypeOfType', e.target.value)
    }
    placeholder="e.g. Proximity"
  />
</Form.Item>

              {/* Loop through values (landMark, distance, time) */}
              {transition.value.map((value, valueIndex) => (
                <Space key={valueIndex} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item label="Landmark" required>
                    <Input
                      value={value.landMark}
                      onChange={(e) =>
                        handleTransitionValueChange(neighbourhoodIndex, transitionIndex, valueIndex, 'landMark', e.target.value)
                      }
                      placeholder="e.g. Park"
                    />
                  </Form.Item>

                  <Form.Item label="Distance" required>
                    <Input
                      value={value.distance}
                      onChange={(e) =>
                        handleTransitionValueChange(neighbourhoodIndex, transitionIndex, valueIndex, 'distance', e.target.value)
                      }
                      placeholder="e.g. 500m"
                    />
                  </Form.Item>

                  <Form.Item label="Time" required>
                    <Input
                      value={value.time}
                      onChange={(e) =>
                        handleTransitionValueChange(neighbourhoodIndex, transitionIndex, valueIndex, 'time', e.target.value)
                      }
                      placeholder="e.g. 5 mins"
                    />
                  </Form.Item>

                  <Button type="link" onClick={() => handleRemoveValue(neighbourhoodIndex, transitionIndex, valueIndex)} icon={<MinusCircleOutlined />}>
                    Remove Value
                  </Button>
                </Space>
              ))}

              <Button type="dashed" onClick={() => handleAddValue(neighbourhoodIndex, transitionIndex)} icon={<PlusOutlined />}>
                Add Value
              </Button>

              <Button type="link" onClick={() => handleRemoveTransition(neighbourhoodIndex, transitionIndex)} icon={<MinusCircleOutlined />}>
                Remove Transition
              </Button>
            </div>
          ))}

          <Button type="dashed" onClick={() => handleAddTransition(neighbourhoodIndex)} icon={<PlusOutlined />}>
            Add Transition
          </Button>

          <Button type="link" onClick={() => handleRemoveNeighbourhood(neighbourhoodIndex)} icon={<MinusCircleOutlined />}>
            Remove Neighbourhood
          </Button>
        </div>
      ))}

      <Form.Item>
        <Button type="dashed" onClick={handleAddNeighbourhood} icon={<PlusOutlined />}>
          Add Neighbourhood
        </Button>
      </Form.Item>



{/* for overview */}
{overviews.map((overview, index) => (
  <div key={index} style={{ marginBottom: '20px' }}>
    {/* Select Name from MasterName Collection */}
    <Form.Item
      label="Name"
      rules={[{ required: true, message: 'Please select a name' }]}
    >
      <Select
        value={typeof overview.name === "object" ? overview.name._id : overview.name} // Handle object or ID
        onChange={(value) => handleOverviewChange(index, 'name', value)}
        placeholder="Select Name"
      >
         

        {overview1.map((name) => (
          <Option key={name._id} value={name._id}>
            {name.name}
          </Option>
        ))}
      </Select>
    </Form.Item>

    {/* Select Page Type */}
    <Form.Item
      label="Page Type"
      rules={[{ required: true, message: 'Please select a page type' }]}
    >
      <Select
        value={overview.pageType}
        onChange={(value) => handleOverviewChange(index, 'pageType', value)}
        placeholder="Select Page Type"
      >
        <Option value="Overview">Overview</Option>
        <Option value="Neighborhood">Neighborhood</Option>
      </Select>
    </Form.Item>

    {/* Select Input Type */}
    {
      console.log(overview)
    }
    <Form.Item
      label="Input Type"
      rules={[{ required: true, message: 'Please select the input type' }]}
    >
      <Select
        value={overview.inputType}
        onChange={(value) => handleOverviewChange(index, 'inputType', value)}
        placeholder="Select Input Type"
      >
        <Option value="text">Text</Option>
        {/* <Option value="number">Number</Option> */}
        <Option value="dropdown">Dropdown</Option>
        {/* <Option value="boolean">Boolean</Option> */}
      </Select>
    </Form.Item>

    {/* Dynamic Input */}
    {overview.inputType === 'text' && (
      <Form.Item
        label="Value (Text)"
        rules={[{ required: true, message: 'Please input a value' }]}
      >
        <Input
          value={overview.value}
          onChange={(e) => handleOverviewChange(index, 'value', e.target.value)}
          placeholder="e.g. Property description"
        />
      </Form.Item>
    )}

    {/* {overview.inputType === 'number' && (
      <Form.Item
        label="Value (Number)"
        rules={[{ required: true, message: 'Please input a value' }]}
      >
        <Input
          value={overview.value}
          onChange={(e) => handleOverviewChange(index, 'value', e.target.value)}
          type="number"
          placeholder="e.g. 500"
        />
      </Form.Item>
    )} */}

    {/* {overview.inputType === 'dropdown' && (

      <>
      <Form.Item
        label="Value (Dropdown)"
        rules={[{ required: true, message: 'Please select a value' }]}
      >
        <Select
          value={overview.value}
          onChange={(value) => handleOverviewChange(index, 'value', value)}
          placeholder="Select an option"
        >
          <Option value="Option 1">Option 1</Option>
          <Option value="Option 2">Option 2</Option>
          <Option value="Option 3">Option 3</Option>
        </Select>
      </Form.Item>
      </>
      
    )} */}

{overview.inputType === 'dropdown' && (
  <>
    {/* Category Dropdown */}
    <Form.Item
      label="Select Category"
      rules={[{ required: true, message: 'Please select a category' }]}
    >
      <Select
        value={overview.category || ''}
        onChange={(value) => handleCategoryChange(index, value)}
        placeholder="Select a category"
      >
        <Option value="furnished">Furnished</Option>
        <Option value="flooring">Flooring</Option>
      </Select>
    </Form.Item>

    {/* Value Dropdown */}
    {overview.category && (
      <Form.Item
        label={`Select ${overview.category}`}
        rules={[{ required: true, message: 'Please select a value' }]}
      >
        <Select
          value={overview.value || ''}
          onChange={(value) => handleOverviewChange(index, 'value', value)}
          placeholder={`Select a ${overview.category}`}
          loading={dropdownLoading}
          notFoundContent={dropdownLoading ? 'loading' : 'No options'}
        >
          {dropdownOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    )}
  </>
)}


    {/* {overview.inputType === 'boolean' && (
      <Form.Item label="Value (Boolean)">
        <Switch
          checked={overview.value === 'true'}
          onChange={(checked) =>
            handleOverviewChange(index, 'value', checked ? 'true' : 'false')
          }
        />
      </Form.Item>
    )} */}

    {/* Remove Button */}
    <Button
      type="link"
      icon={<MinusCircleOutlined />}
      onClick={() => handleRemoveOverview(index)}
    >
      Remove Overview
    </Button>
  </div>
))}

{/* Add New Overview Button */}
<Form.Item>
  <Button type="dashed" onClick={handleAddOverview} icon={<PlusOutlined />}>
    Add Overview
  </Button>
</Form.Item>






      {/* For TAB */}
      {
        console.log(tags)
      }
{tags.map((tag, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item
            label={`Tag ${index + 1}`}
            required
            rules={[{ required: true, message: 'Please input the tag value!' }]}
          >
            <Input
              placeholder="Enter tag value"
              value={tag.value}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
          </Form.Item>

          {/* Remove button for the tag */}
          {tags.length > 1 && (
            <MinusCircleOutlined
              onClick={() => handleRemoveTag(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          )}
        </Space>
      ))}

      {/* Button to add a new tag */}
      <Form.Item>
        <Button type="dashed" onClick={handleAddTag} icon={<PlusOutlined />}>
          Add Tag
        </Button>
      </Form.Item>


      {/* image array */}
      <Form.Item label="Upload Images" required>
        <Dragger
          name="file"
          customRequest={handleUpload}
          showUploadList={false}
          multiple={true}
        >
          <div>
            <PlusOutlined />
            <div>Click or drag to upload images</div>
          </div>
        </Dragger>
      </Form.Item>

      {/* Display Uploaded Images */}
      <Form.Item label="Uploaded Images" required>
        <List 
          itemLayout="horizontal"
          dataSource={images}
          renderItem={(imageUrl) => (
            <List.Item
              actions={[
                <Button
                  icon={<MinusCircleOutlined />}
                  onClick={() => removeImage(imageUrl)}
                  danger
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
  title={<img src={`${baseurl}${imageUrl}`} alt="Image Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
  // description={imageUrl}
/>
</List.Item>
          )}
        />
      </Form.Item>



{/* for map coordinate */}
{mapCenter.map((coordinate, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item
            label={`Coordinate ${index + 1}`}
            required
            rules={[{ required: true, message: 'Please input the coordinate!' }]}
          >
            <InputNumber
              placeholder="Enter coordinate"
              value={coordinate}
              onChange={(value) => handleCoordinateChange(index, value)}
            />
          </Form.Item>

          {/* Remove button for the coordinate */}
          {mapCenter.length > 1 && (
            <MinusCircleOutlined
              onClick={() => handleRemoveCoordinate(index)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          )}
        </Space>
      ))}

      {/* Button to add a new coordinate */}
      <Form.Item>
        <Button type="dashed" onClick={handleAddCoordinate} icon={<PlusOutlined />}>
          Add Coordinate
        </Button>
      </Form.Item>

           
        


      {
            editingProperties?(<> 
            

            {
              cross?(<>
              <CloseCircleOutlined style={{width:"30px"}} onClick={handleCross} />
             <img src={`${baseurl}${record1?.camelliasImage}`} alt="" style={{width:"100px",height:"100px"}} />
             
              </>):(<>
                  
                <Form.Item
              label="Camellias Image"
              name="camelliasImage"
              onChange={(e) => setPhoto(e.target.files[0])}
              
              rules={[
                { required: true, message: "Please upload the driver's photo!" },
              ]}
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
              </>)
            }
            
            
            </>):(<>
            
            
              <Form.Item
              label="Camellias Image"
              name="camelliasImage"
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
            
            </>)
          }





          {/* <Form.Item
              label="Camellias Image"
              name="camelliasImage"
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
            )} */}

         

            {/* <Form.Item
              label="Builder Logo"
              name="builderLogo"
            //   onChange={(e) => setPhoto(e.target.files[0])}
              
             
            >
              <Upload
                listType="picture"
                beforeUpload={() => false}
                onChange={uploadImage1}
  
                
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
            </Form.Item> */}




                <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProperties ? 'Update' : 'Submit'}
            </Button>
          </Form.Item>

          </Form>

        </Modal>
    </div>
  );
};

export default Properties;
