import { Button, Modal } from 'antd'
import Products from 'components/Products'
import React, { useState } from 'react'
import AddProduct from 'components/Forms/Product/Add'

const ProductsList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newProductId, setNewProductId] = useState(null)
  const onFinish= (newProduct) => {
    setIsModalVisible(false)
    setNewProductId(newProduct.id)
  }
  const setModalVisibility = () => setIsModalVisible(!isModalVisible)
  return (
    <div>
      <h1>Lista de códigos</h1>
      <div className="mb-2">
        <Button type="primary" onClick={setModalVisibility}>
          Agregar código nuevo
        </Button>
      </div>
      <Products newProductId={newProductId} />
      <Modal
        centered
        visible={isModalVisible}
        title="Agregar producto nuevo"
        footer={null}
        onCancel={setModalVisibility}
      >
        <AddProduct onFinish={onFinish} />
      </Modal>
    </div>
  )
}

export default ProductsList
