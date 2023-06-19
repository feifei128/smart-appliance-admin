import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Card, Descriptions, Space } from 'antd';
import { FC, useEffect, useState } from 'react';
import React from 'react';
import { useRequest } from 'umi';
import { request, useParams } from '@umijs/max';

interface Order {
    id: number;
    date: string;
    product: string;
    price: number;
    quantity: number;
    status: string;
    shippingMethod: string;
    shippingFee: number;
    paymentMethod: string;
    paymentTime: string;
    refundMethod: string;
    refundTime: string;
}

interface Client {
    id: number;
    name: string;
    age: number;
    gender: string;
    birthday: string;
    job: string;
    education: string;
    phone: string;
    address: string;
    status: string;
    lastConsumptionTime: string;
    orders: Order[];
}

const CilentDetail: FC = () => {
    const { id } = useParams<{ id: number }>();
    const [client, setClient] = useState<Client | null>(null);
    const [activeTabKey, setActiveTabKey] = useState<string>('productInquiries');
    const columns: ProColumns<Order>[] = [
        {
            title: '订单编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '订单日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '产品名称',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: '产品价格',
            dataIndex: 'price',
            key: 'price',
            search: false,
            render: (text: number) => {
                return `￥${text.toFixed(2)}`;
            },
        },
        {
            title: '产品数量',
            dataIndex: 'quantity',
            key: 'quantity',
            search: false,
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            search: false,
            render: (text: string) => {
                if (text === '已发货' || text === '已收货') {
                    return <Badge status="success" text={text} />;
                }
                return <Badge status="processing" text={text} />;
            },
        },
        {
            title: '配送方式',
            dataIndex: 'shippingMethod',
            valueType: 'select',
            key: 'shippingMethod',
        },
        {
            title: '配送费用',
            dataIndex: 'shippingFee',
            key: 'shippingFee',
            search: false,
            render: (text: number) => {
                return `￥${text.toFixed(2)}`;
            },
        },
        {
            title: '支付方式',
            dataIndex: 'paymentMethod',
            valueType: 'select',
            key: 'paymentMethod',
        },
        {
            title: '支付时间',
            dataIndex: 'paymentTime',
            key: 'paymentTime',
            search: false,
        },
    ];
    useEffect(() => {
        // 模拟异步请求数据
        const mockFetchClient = async () => {
            const response = await request(`/api/clients`);
            let data = response.filter(
                (item) => item.id == id
            );
            setClient(data[0]);
        };
        mockFetchClient();
    }, [id]);
    return (
        <PageContainer>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card bordered>
                    <Descriptions title="客户基本信息" >
                        <Descriptions.Item label="用户姓名">{client?.name}</Descriptions.Item>
                        <Descriptions.Item label="年龄">{client?.age}</Descriptions.Item>
                        <Descriptions.Item label="性别">{client?.gender}</Descriptions.Item>
                        <Descriptions.Item label="出生日期">{client?.birthday}</Descriptions.Item>
                        <Descriptions.Item label="职业">{client?.job}</Descriptions.Item>
                        <Descriptions.Item label="学历">{client?.education}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">{client?.phone}</Descriptions.Item>
                        <Descriptions.Item label="地址">{client?.address}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card bordered={false} title="订单记录">
                    <ProTable<Client>
                        columns={columns}
                        dataSource={client?.orders}
                        options={false}
                    />
                </Card>
                <Card
                    title="近半年咨询客服记录"
                    style={{ width: '100%' }}
                    tabList={[
                        {
                            key: 'productInquiries',
                            tab: '产品咨询',
                        },
                        {
                            key: 'afterSales',
                            tab: '售后服务',
                        },
                    ]}
                    activeTabKey={activeTabKey}
                    tabBarExtraContent={<a href="#">More</a>}
                    onTabChange={(key: string) => {
                        setActiveTabKey(key);
                    }}
                >
                    {activeTabKey}
                </Card>
            </Space>


        </PageContainer>
    );
};

export default CilentDetail;
