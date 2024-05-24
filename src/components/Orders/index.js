import React, { useEffect, useState } from 'react'
import { Button, Table, Tag } from 'antd'
import config from 'config'
import apiClient from 'services/axios'

const Orders = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get('/orders')
      console.log('data', data)
      if (response) setData(response.data)
    }
    fetchData()
  }, [])
  console.log('orders', data)
  const handleFinish = async (id) => {
    try {
      await apiClient.post(`/generate-qr`, { orderId: id })
      const response = await apiClient.get('/orders')
      setData(response.data)
    } catch (error) {
      console.error('Error finishing order:', error)
    }
  }

  const getColums = () => {
    return [
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <React.Fragment>
            {record.status === 'pending' ? (
              <Button type="primary" onClick={() => handleFinish(record.id)}>
                Crear pulsera
              </Button>
            ) : (
              <Tag color="green">Finished</Tag>
            )}
          </React.Fragment>
        ),
      },
    ]
  }
  return (
    <Table
      scroll={{ x: 720 }}
      columns={getColums()}
      dataSource={data ?? []}
      rowKey={(record) => record.id}
    />
  )
}

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Producto',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Imagen',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Información del usuario',
    dataIndex: 'userInfo',
    key: 'userInfo',
    render: (userInfo) => (
      <>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
      </>
    ),
  },
]

export default Orders
