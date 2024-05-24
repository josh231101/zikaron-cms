import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, message, Tag } from 'antd'
import apiClient from 'services/axios'
import { connect } from 'react-redux'

const Regions = ({ user }) => {
  const [regions, setRegions] = useState([])
  const [filteredRegions, setFilteredRegions] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
  })
  const onTableChange = (pagination) => {
    setPagination(pagination)
  }

  const fetchRegions = async () => {
    try {
      const response = await apiClient.get('/regions')
      const data = await response.data
      setRegions(data)
      setFilteredRegions(data)
      setPagination({ ...pagination, total: data.length })
    } catch (error) {
      console.error('Error fetching regions:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Fetch regions from the backend and update the state
    setLoading(true)
    fetchRegions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEdit = (region) => {
    // Handle edit button click
    // Open modal for editing the region with the given ID
    setIsEditModalVisible(region)
  }

  const patchRegion = async (values) => {
    try {
      const response = await apiClient.patch(`/regions/${isEditModalVisible.id}`, values)
      if (!response) return console.log('error')
      setIsEditModalVisible(false)
      message.success('Región editada correctamente')
      setLoading(true)
      fetchRegions()
    } catch (err) {
      message.error('Error al editar la región')
    }
  }

  const columns = [
    {
      title: 'Número',
      dataIndex: 'region_number',
      key: 'region_number',
      sorter: (a, b) => a.region_number - b.region_number,
      width: 100,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : -1),
    },
    {
      title: 'Encargado',
      dataIndex: 'manager',
      key: 'manager',
      sorter: (a, b) => (a.manager ? a.manager.localeCompare(b.manager) : -1),
    },
    {
      title: 'Estados',
      dataIndex: 'states',
      key: 'states',
      // Print states as antd tags
      render: (states) => (
        <>
          {states?.map((state) => (
            <Tag key={state}>
              {state}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, region) => (
        <Button type="primary" onClick={() => handleEdit(region)}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Button>
      ),
    },
  ]

  const postRegions = async (values) => {
    try {
      const response = await apiClient.post('/regions', values)
      if (!response) return console.log('error')
      setIsModalVisible(false)
      message.success('Región agregada correctamente')
      setLoading(true)
      fetchRegions()
    } catch (err) {
      message.error('Error al agregar la región')
    }
  }

  const handleSearch = (value) => {
    setSearchValue(value)
    const filteredData = regions.filter((region) =>
      region.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredRegions(filteredData)
  }

  const composeColumns = () => {
    if (user.role !== 'admin') {
      return columns.filter((column) => column.key !== 'actions')
    }
    return columns
  }

  return (
    <div>
      <div className="row">
        <Input.Search
          placeholder="Buscar región"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300, margin: '0 0 1rem' }}
        />
      </div>
      {user.role === 'admin' && (
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Agregar región
        </Button>
      )}
      <Table
        dataSource={filteredRegions}
        columns={composeColumns()}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
      />

      <Modal
        title="Agregar región"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Simple ant design form that has an input string and post the regions */}
        <Form
          name="basic"
          initialValues={''}
          onFinish={(values) => postRegions(values)}
          onFinishFailed={(errorInfo) => message.error('Error al agregar la posición')}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la posición' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal for editing a position */}
      {
        <Modal
          title="Edit Position"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(null)}
          destroyOnClose={true}
          footer={null}
        >
          {/* Simple ant design form that has an input string and post the positions */}
          <Form
            name="basic"
            initialValues={{ name: isEditModalVisible ? isEditModalVisible.name : '' }}
            onFinish={(values) => patchRegion(values)}
            onFinishFailed={(errorInfo) => message.error('Error al editar la posición')}
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'Por favor ingresa el nombre de la posición' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Editar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      }
    </div>
  )
}

export default connect((state) => ({ user: state.user }))(Regions)
