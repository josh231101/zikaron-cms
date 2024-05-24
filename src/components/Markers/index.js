import React, { useEffect, useState } from 'react';
import { Image, Table } from 'antd';
import apiClient from 'services/axios';

const Markers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchMarkers();
    }, []);

    const fetchMarkers = async () => {
        try {
            const response = await apiClient.get('/markers');
            const markers = await response.data;
            console.log('markers', markers);
            setData(markers);
        } catch (error) {
            console.error('Error fetching markers:', error);
        }
    };

    const columns = [
        {
            title: 'QR URL',
            dataIndex: 'qrUrl',
            key: 'qrUrl',
        },
        {
            title: 'QR Image URL',
            dataIndex: 'qrImageUrl',
            key: 'qrImageUrl',
            render: (text) => <Image src={text} width={200}/>,
        },
        {
            title: 'Marker URL',
            dataIndex: 'markerUrl',
            key: 'markerUrl',
            render: (text) => text ? 'Yes' : 'No',
        },
        {
            title: 'Resource URL',
            dataIndex: 'resourceUrl',
            key: 'resourceUrl',
            render: (text) => <Image src={text} width={300}/>,

        },
    ];

    return <Table dataSource={data} columns={columns} />;
};

export default Markers;