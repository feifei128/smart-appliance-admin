import { FC, useEffect } from 'react';
import React, { useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Input,
    List,
    Menu,
    Modal,
    Progress,
    Radio,
    Row,
} from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { request } from 'umi';

export const BasicList: FC = () => {

    const [list, setList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await request(`/api/employees`);
            setList(response);
        };
        getData();
    }, []);

    return (
        <>
            <PageContainer>
                <div >
                    <Card
                        bordered={false}
                        title="员工业绩"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                    >
                        <List
                            size="large"
                            rowKey="id"
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <a key="edit" onClick={(e) => { e.preventDefault(); console.log('edit', item); }}>
                                            编辑
                                        </a>,
                                        <a key="delete" onClick={(e) => { e.preventDefault(); console.log('delete', item); }}>
                                            删除
                                        </a>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} size={42} shape="square" style={{ marginBottom: -15 }} />}
                                        title={<a href="#">{item.name}</a>}
                                        description={`${item.gender}，${item.age}岁`}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'gray', width: '70%' }}>
                                        <div style={{ flex: 1, textAlign: 'center', marginRight: 50 }} >
                                            出勤率<br />
                                            <Progress percent={item.processing.toFixed(2)} size="small" />
                                        </div>
                                        <div style={{ flex: 1, textAlign: 'center', marginRight: 50 }}>
                                            解决率<br />
                                            <Progress percent={item.solving.toFixed(2)} size="small" />
                                        </div>
                                        <div style={{ flex: 1, textAlign: 'center' }}>
                                            平均工时<br />
                                            {item.workHours.toFixed(2)}
                                            <span style={{ fontSize: 8, marginLeft: 8 }}>时/天</span></div>
                                        <div style={{ flex: 1, textAlign: 'center' }}>KPI<br />{item.kpi.toFixed(2)}</div>
                                    </div>
                                </List.Item>
                            )}
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSize: 10,
                                total: list.length
                            }}
                        />
                    </Card>
                </div>
            </PageContainer>
            {/* <Button
                type="dashed"
                onClick={() => {
                    setVisible(true);
                }}
                style={{ width: '100%', marginBottom: 8 }}
            >
                <PlusOutlined />
                添加
            </Button> */}

        </>
    );
};

export default BasicList;
