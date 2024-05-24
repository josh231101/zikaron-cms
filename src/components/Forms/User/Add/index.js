import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, Select, message, Row, Col } from 'antd'
import useFetch from 'hooks/useFetch'
import apiClient from 'services/axios'

const { Option } = Select

const AddUser = ({ onFinish }) => {
  const { response: countries, loading, error } = useFetch('/countries')
  const [isLoadingNewUser, setUserStatus] = useState(false)
  const [form] = Form.useForm()

  const onFormFinish = (values) => {
    const sanitizedData = {
      ...values,
      birth_date: values.birth_date.format('YYYY-MM-DD HH:mm:ss'),
    }
    setUserStatus(true)
    setTimeout(() => {
      apiClient
        .post('/users', { user: sanitizedData })
        .then((res) => {
          if (res.data) {
            message.success('New user saved')
            setUserStatus(false)
            onFinish && onFinish(res.data.user)
          }
        })
        .catch((err) => {
          message.error('Error guardando nuevo usuario')
          setUserStatus(false)
        })
    }, 1)
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Llena todos los campos')
  }

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFormFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      layout="horizontal"
    >
      <Row>
        <Col span={12}>
          <Form.Item
            label="Nombre(s)"
            name="first_name"
            rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Apellido"
            name="last_name"
            rules={[{ required: true, message: 'Porfavor llena este campo!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[{ type: 'email', required: true, message: 'Ingresa un correo electrónico' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Porfavor crea una contraseña para el usuario!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="Teléfono" name="phone">
        <Input />
      </Form.Item>

      <Form.Item
        label="Sexo"
        name="gender"
        rules={[{ required: true, message: 'Porfavor selecciona el checkbox!' }]}
      >
        <Radio.Group>
          <Radio value="H">Masculino</Radio>
          <Radio value="M">Femenino</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Fecha de nacimiento"
        name="birth_date"
        rules={[{ required: true, message: 'Porfavor selecciona el checkbox!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="País"
        name="country_id"
        rules={[{ required: true, message: 'Porfavor selecciona un sexo!' }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          placeholder="Porfavor selecciona un país"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
        >
          {countries &&
            countries.map((country) => <Option value={country.id}>{country.name}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoadingNewUser}>
          Crear usuario
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddUser
