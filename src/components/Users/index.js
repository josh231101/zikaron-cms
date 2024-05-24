import React from 'react'
import { Table, Tag, Space } from 'antd'
import useFetch from 'hooks/useFetch'

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'first_name',
    key: 'first_name'
  },
  {
    title: 'Apellido',
    dataIndex: 'last_name',
    key: 'last_name'
  },
  {
    title: 'Correo electrónico',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Sexo',
    dataIndex: 'gender',
    key: 'gender',
    render: (text) => <Tag>{text}</Tag>,
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <Tag>{text}</Tag>,
  },
]

const Users = ({ newUserId }) => {
  const { response : users, loading, error } = useFetch('/users', newUserId)
  return (
    <Table
      scroll={{ x: 720 }}
      loading={loading}
      columns={columns}
      dataSource={users ?? []}
      rowKey={(record) => record.id}
    />
  )
}

export default Users
