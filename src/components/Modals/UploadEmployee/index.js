import React, { useState } from 'react'
import { Button, Modal, Timeline, message, notification } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import generateCSV from 'utils/generateCSV'
import apiClient from 'services/axios'
import config from 'config'
import store from 'store'

const UploadEmployee = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false)

  const downloadEmployeeTemplate = () => {
    // TD: StoreTypes
    const headers = {
      first_name: 'Nombre',
      last_name_1: 'Apellido paterno',
      last_name_2: 'Apellido materno',
      curp: 'CURP',
      nss: 'NSS',
      position: 'Puesto',
      region: 'Región',
      service: 'Servicio',
      admission_date: 'Fecha de ingreso',
    }
    generateCSV([headers], 'employee-template')
  }
  const downloadPositionsAndRegions = () => {
    setLoading(true)
    downloadPositionsAndRegionsFetch()
  }
  const downloadPositionsAndRegionsFetch = async () => {
    try {
      const { data } = await apiClient.get('/positions-and-regions')
      const headers = {
        position: 'Puestos',
        region: 'Regiones',
      }
      if (!data) return
      const { positions, regions } = data
      const max = positions.length > regions.length ? positions.length : regions.length
      let obj = []
      for (let i = 0; i < max; i++) {
        const position = positions[i] ? positions[i].name : null
        const region = regions[i] ? regions[i].name : null
        obj.push({ position, region })
      }
      obj.unshift(headers)
      generateCSV(obj, 'positions-and-regions')
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleImportEmployeeUpload = (info) => {
    const { status } = info.file
    if (status === 'done') {
      const response = info.file.response

      notification.success({
        message: 'Archivo subido correctamente',
        description: `¡${response.successOperations} elementos creados!`,
      })
      if (response.errors && response.errors.length > 0) {
        notification.error({
          message: 'Algunos elementos no pudieron ser creados :(',
          description: `¡${response.errors.length} elementos no pudieron ser creados!`,
        })
        // Create a CSV with the errors the object is { element: number, error: string }
        const headers = {
          element: 'Elemento',
          error: 'Error',
        }
        const errors = response.errors.map((item) => ({
          element: item.element,
          error: item.error,
        }))
        generateCSV([headers, ...errors], 'employee-errors')
      }
      onCancel()
    } else if (status === 'error') {
      message.error(`Hubo un error procesando el archivo: ${info.file.response.message}`)
    }
  }

  return (
    <Modal visible={visible} onCancel={onCancel} title="Alta de elementos nuevos" footer={null}>
      <Timeline>
        <Timeline.Item>
          <div>
            <div className="row">
              <div className="col-8">
                <strong className="h6 font-weight-bold">Descargar plantilla</strong>
                <br />
                Necesitas utilizar la plantilla en el orden que se indica
              </div>
              <div className="col-4 text-right">
                <Button onClick={downloadEmployeeTemplate}>
                  <i className="fa fa-download" />
                  &nbsp; Descargar
                </Button>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <div className="row">
              <div className="col-7">
                <strong className="h6 font-weight-bold">
                  Descarga los puestos y regiones disponibles
                </strong>
                <br />
                Utiliza estos textos admitidos como valores
              </div>
              <div className="col-5 text-right">
                <Button onClick={downloadPositionsAndRegions} loading={loading} disabled={loading}>
                  <i className="fa fa-download" />
                  &nbsp; Descargar
                </Button>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <strong className="h6 font-weight-bold">Llenar plantilla</strong>
          <br />
          Llena la plantilla con los datos de tus empleados
        </Timeline.Item>
      </Timeline>

      <Dragger
        name="file"
        data={{ status: 'HOLA' }}
        multiple={false}
        headers={{
          Authorization: `Bearer ${store.get('accessToken')}`,
          AccesToken: store.get('accessToken'),
        }}
        onChange={handleImportEmployeeUpload}
        action={`${config.homeUrl}/employees/importList`}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Subir archivo</p>
        <p className="ant-upload-hint">Arrastra o sube tu archivo aquí</p>
      </Dragger>
    </Modal>
  )
}

export default UploadEmployee
