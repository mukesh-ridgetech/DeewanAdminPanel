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
  Spin,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  BellOutlined,
  TranslationOutlined,
  TruckOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { baseurl } from "../helper/Helper";
import axios from "axios";
import Password from "antd/es/input/Password";
// import { baseurl } from "../helper/Helper";
import { useAuth } from "../context/auth";

const Testinomial = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestinomial, setEditingTestinomial] = useState(null);
  const [image1, setImage] = useState();
  const [form] = Form.useForm();
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState("");
  const [imageTrue, setImageTrue] = useState(false);

  console.log(auth.user._id);

  // http://localhost:5000/api/amenities/getAmenties
  useEffect(() => {
    fetchTestinomial();
  }, []);

  const fetchTestinomial = async () => {
    setLoading(true);
    try {
      const respons = await axios.get(
        baseurl + "/api/testinomial/getTestinomial"
      );
      //    console.log(respons.data.amenities[0].logo);

      if (respons.data) {
        setData(respons.data);
        // message.success('Amenities fetched successfully!');
      }

      //   message.success('Country codes fetched successfully!');
    } catch (error) {
      console.error("Error fetching Amenities:", error);
      //   message.error('Error fetching Amenities.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (record) => {
    try {
      const response = await axios.patch(
        `${baseurl}/api/testinomial/toggled/${record._id}`
      );
      console.log(response);

      if (response) {
        message.success("Status Updated Succesfully");
        fetchTestinomial();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setImages([]);
    setEditingTestinomial(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setImageTrue(true);
    setEditingTestinomial(record);
    form.setFieldsValue({
      name: record.name,
      location: record.location,
      rating: record.rating,
      description: record.description,
    });

    if (record.images) {
      setImages(record.images);
    }
    setIsModalOpen(true);
  };

  //   for image array
  const [images, setImages] = useState([]);

  // Handle image upload and store URL in state
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file.file);

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

      if (response.data.imageUrl) {
        // Store the image URL in the state array
        setImages((prevImages) => [...prevImages, response.data.imageUrl]);
        message.success("Image uploaded successfully!");
      } else {
        message.error("Image upload failed!");
      }
    } catch (error) {
      message.error("Error uploading image!");
    }

    return false; // Prevent default upload behavior
  };

  // console.log("images",images);
  // Remove an image URL from the array
  const removeImage = (url) => {
    setImages((prevImages) => prevImages.filter((image) => image !== url));
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

      if (response) {
        message.success("Image uploaded successfully!");
        setImage(response.data.imageUrl);
      }

      return response.data.imageUrl; // Assuming the API returns the image URL in the 'url' field
    } catch (error) {
      message.error("Error uploading image. Please try again later.");
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handlePost = async (values) => {
    const postdata = {
      name: values.name,
      location: values.location,
      description: values.description,
      rating: values.rating,
      images: images,
    };

    try {
      const response = await axios.post(
        baseurl + "/api/testinomial/createTestinomial",
        postdata
      );
      console.log(response.data);

      if (response.data) {
        message.success("Amenties created successfully!");
        setIsModalOpen(false);
        setPhoto("");
        fetchTestinomial();
      }

      // sdkhbfkshdbfk
    } catch (error) {
      console.log(error);
    }
  };

  const handlePut = async (values) => {
    // "name":"John",
    // "location":"GuruGram",
    // "description":"Diwan Realty truly cares about their clients. They listened to my needs and preferences and helped me find the perfect home in the Bay Area. Their professionalism and attention to detail are unmatched.",
    // "images":["/uploads/image-1731649898756-499717835.png","/uploads/image-1731649898756-499717835.png"],
    // "rating":4.5

    const postdata = {
      name: values.name,
      location: values.location,
      description: values.description,
      rating: values.rating,
      images: images,
    };

    try {
      const response = await axios.put(
        `${baseurl}/api/testinomial/updateTestinomial/${editingTestinomial._id}`,
        postdata
      );
      console.log(response.data);

      if (response.data) {
        message.success("Testinomial updated successfully!");
        setIsModalOpen(false);
        // setPhoto("");
        fetchTestinomial();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (values) => {
    if (editingTestinomial) {
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

    // location

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },

    //   description
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
        Add Testinomial
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        // rowKey="_id"
      />

      <Modal
        title={editingTestinomial ? "Edit Testinomial" : "Add Testinomial"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            // rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            // rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            // rules={[{ required: true, message: 'Please input the name!' }]}
            style={{ width: "100%" }}
          >
            <InputNumber placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please Input the Properties Description!",
              },
            ]}
          >
            <Input.TextArea
              // placeholder="Enter Properties Description"
              rows={4} // Adjust the number of rows if necessary
            />
          </Form.Item>

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
                    title={
                      <img
                        src={`${baseurl}${imageUrl}`}
                        alt="Image Preview"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    }
                    // description={imageUrl}
                  />
                </List.Item>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTestinomial ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Testinomial;
