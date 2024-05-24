import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import apiClient from 'services/axios';

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch states data from API or database
  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/localities');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching localities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddState = () => {
    setVisible(true);
  };

  const handleSaveState = () => {
    form.validateFields().then((values) => {
      // Replace with your API or database call to save the state
      // values.regionName and values.stateName contain the form input values
      // After saving, you can fetch the updated states data again
      // and close the modal
      console.log(values);
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Region Name',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: 'State Name',
      dataIndex: 'stateName',
      key: 'stateName',
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddState}>
        Add State
      </Button>
      <Table
        dataSource={states}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Modal
        visible={visible}
        title="Add State"
        onCancel={handleCancel}
        onOk={handleSaveState}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="regionName"
            label="Region Name"
            rules={[{ required: true, message: 'Please enter the region name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stateName"
            label="State Name"
            rules={[{ required: true, message: 'Please enter the state name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default States;
