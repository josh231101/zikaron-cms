import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import apiClient from 'services/axios'

const Localities = () => {
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Region Name',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: 'Locality Name',
      dataIndex: 'localityName',
      key: 'localityName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/localities');
      setLocalities(response.data);
    } catch (error) {
      console.error('Error fetching localities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/localities/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting locality:', error);
    }
  };

  const handleAdd = async (values) => {
    try {
      await apiClient.post('/localities', values);
      fetchData();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding locality:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Locality
      </Button>
      <Table
        dataSource={localities}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Add Locality"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAdd}>
          <Form.Item
            name="regionName"
            label="Region Name"
            rules={[{ required: true, message: 'Please enter the region name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="localityName"
            label="Locality Name"
            rules={[{ required: true, message: 'Please enter the locality name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Localities;
