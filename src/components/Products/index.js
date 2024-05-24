import React from 'react'
import { Table, Tag, Button, message } from 'antd'
import useFetch from 'hooks/useFetch'
import config from 'config'
import apiClient from 'services/axios'

const willDeactivate = (_id) => {
  apiClient
  .post(`/products/deactivate/${_id}`)
  .then((res) => {
    window.location.reload()
  })
  .catch((err) => {
    message.error('Error guardando nuevo producto')
  })
}
const willActivate = (_id) => {
  apiClient
  .post(`/products/activate/${_id}`)
  .then((res) => {
    window.location.reload()
  })
  .catch((err) => {
    message.error('Error guardando nuevo producto')
  })
}

const Products = ({ newProductId}) => {
  const { response : products, loading, error } = useFetch('/products', newProductId)
  return (
    <Table
      scroll={{ x: 720 }}
      loading={loading}
      columns={columns}
      dataSource={products ?? []}
      rowKey={(record) => record.id}
    />
  )
}

const columns = [
  {
    title: 'Imagen',
    dataIndex: 'icon_image',
    key: 'icon_image',
    render: (icon_image) => (<img width="80" src={`${config.imagesUrl}${icon_image}`} />)
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    key: 'is_active',
    render: (is_active) => <Tag color={`${is_active ? 'green' : 'red'}`}>{is_active ? 'Activo' : 'Inactivo'}</Tag>,
  },
  {
    title: '',
    dataIndex: 'is_active',
    key: 'deactivate',
    render: (is_active, product) => is_active ? <Button onClick={() => willDeactivate(product._id)}>Deactivate</Button> : <Button onClick={()=> willActivate(product._id)}>Activate</Button>
  }
]


export default Products
