import React, { useState } from 'react';
import { Form, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ImageUploader = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList); // Update file list
  };

  const handleUpload = async () => {
    const formData = new FormData();
    
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    } else {
      message.error('Please select an image to upload.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/amenities/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Image uploaded successfully!');
      console.log('Image URL:', response.data.imageUrl);
      setFileList([]); // Clear file input after successful upload
    } catch (error) {
      message.error('Error uploading image: ' + (error.response?.data?.message || error.message));
    }
  };

  

  return (
    <div>
      <Upload
        listType="picture"
        fileList={fileList}
        beforeUpload={() => false}
        onChange={handleFileChange}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>

      <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUploader;
