import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const CreateAmenity = ({ createdBy }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Handle file change
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList); // Update file list
  };

  // Submit the form
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('createdBy', '6710ce69300af26fe95b152a'); // Include the createdBy field

    // Append each logo to the form data as an array
    fileList.forEach((file) => {
      formData.append('logo[]', file.originFileObj); // Append logos as array (logo[])
    });

    try {
      const response = await axios.post('http://localhost:5000/api/amenities/createAmenties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Amenity created successfully!');
      form.resetFields(); // Reset the form
      setFileList([]); // Clear file input
    } catch (error) {
      message.error('Error creating amenity: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form.Item
        label="Amenity Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the amenity name' }]}
      >
        <Input placeholder="Enter amenity name" />
      </Form.Item>

      <Form.Item label="Upload Logo(s)">
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={() => false} // Prevent auto upload
          onChange={handleFileChange}
          accept="image/*"
          multiple // Allow multiple files to be selected
        >
          <Button icon={<UploadOutlined />}>Select Logo(s)</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Amenity
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAmenity;
