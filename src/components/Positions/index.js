import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import apiClient from 'services/axios'
import { connect } from 'react-redux'

const Positions = ({ user }) => {
  const [positions, setPositions] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const fetchPositions = async () => {
    try {
      const response = await apiClient.get('/positions')
      const data = await response.data
      setPositions(data)
    } catch (error) {
      console.error('Error fetching positions:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Fetch positions from the backend and update the state
    setLoading(true)
    fetchPositions()
  }, [])

  const handleEdit = (position) => {
    // Handle edit button click
    // Open modal for editing the position with the given ID
    setIsEditModalVisible(position)
  }

  const patchPosition = async (values) => {
    try {
      const response = await apiClient.patch(`/positions/${isEditModalVisible.id}`, values)
      if (!response) return console.log('error')
      setIsEditModalVisible(false)
      message.success('Posición editada correctamente')
      setLoading(true)
      fetchPositions()
    } catch (err) {
      message.error('Error al editar la posición')
    }
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const filteredPositions = positions.filter((position) =>
    position.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name ? a.name.localeCompare(b.name) : -1),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, position) => (
        <Button type="primary" onClick={() => handleEdit(position)}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Button>
      ),
    },
  ]

  const postPositions = async (values) => {
    try {
      const response = await apiClient.post('/positions', values)
      if (!response) return console.log('error')
      setIsModalVisible(false)
      message.success('Posición agregada correctamente')
      setLoading(true)
      fetchPositions()
    } catch (err) {
      message.error('Error al agregar la posición')
    }
  }

  const composeColumns = () => {
    if (user.role === 'admin') {
      return columns
    }
    return columns.filter((column) => column.key !== 'actions')
  }
  return (
    <div>
      <div className="row">
        <Input.Search
          placeholder="Buscar posición"
          onChange={handleSearch}
          style={{ width: 300, margin: '0 0 1rem' }}
        />
      </div>
      {user.role === 'admin' && (
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Agregar posiciones
        </Button>
      )}

      <Table dataSource={filteredPositions} columns={composeColumns()} loading={loading} />

      <Modal
        title="Add Position"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {/* Simple ant design form that has an input string and post the positions */}
        <Form
          name="basic"
          initialValues={''}
          onFinish={(values) => postPositions(values)}
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
            onFinish={(values) => patchPosition(values)}
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

export default connect((state) => ({ user: state.user }))(Positions)
