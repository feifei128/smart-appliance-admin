import { CopyOutlined } from '@ant-design/icons';
import { EditableProTable, ModalForm, ProForm, ProFormDateTimePicker, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProList } from '@ant-design/pro-components';
import { Button, message, Progress, Space, Tag } from 'antd';
import { Divider } from 'antd/es';
import { ReactText, Suspense, useRef, useState } from 'react';
import { request } from 'umi';
import Charts from './components/charts';

const Order: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [list, setList] = useState([])
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

    const formRef = useRef<ProFormInstance>();
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Charts />
                <ProList
                    search={{
                        filterType: 'light',
                    }}
                    rowKey="name"
                    headerTitle="订单列表"
                    expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                    request={async (params) => {
                        const response = await request('/api/orders');
                        let data = response;
                        if (params.orderNo)
                            data = data.filter(val => val.orderNo.includes(params.orderNo))
                        if (params.customerName)
                            data = data.filter(val => val.customerName.includes(params.customerName))
                        if (params.status)
                            data = data.filter(val => val.status === params.status)
                        return {
                            data: data,
                            total: data.length,
                        };
                    }}
                    pagination={{
                        pageSize: 10,
                    }}
                    showActions="hover"
                    metas={{
                        title: {
                            dataIndex: 'orderNo',
                            title: '订单号',
                            render(val, record) {
                                return `${record?.customerName}（订单号：${val}）`
                            }
                        },
                        avatar: {
                            dataIndex: 'avatar',
                            search: false,
                        },
                        description: {
                            dataIndex: 'desc',
                            search: false,
                            render: (_, row) => {
                                return (
                                    <>
                                        <div>订单号：{row.orderNo}</div>
                                        <div>收货人：{row.customerName}</div>
                                        <div>联系方式：{row.customerPhone}</div>
                                        <div>地址：{row.customerAddress}</div>
                                    </>
                                )
                            },
                        },
                        subTitle: {
                            dataIndex: 'status',
                            render: (_, row) => {
                                return (
                                    <Space size={0}>
                                        <Tag color="blue" key={row.status}>
                                            {row.status}
                                        </Tag>
                                    </Space>
                                );
                            },
                            search: false,
                        },
                        content: {
                            render: (_, row) => (
                                <div
                                    style={{
                                        minWidth: 200,
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '200px',
                                        }}
                                    >
                                        <div>{row.status}</div>
                                        <Progress
                                            percent={
                                                row.status === '待付款' ? 25
                                                    : row.status === '待发货' ? 50
                                                        : row.status === '待安装' ? 75
                                                            : row.status === '已完成' ? 100 : 0
                                            }
                                            steps={4}
                                            strokeColor={['', '', 'green', 'green']}
                                        />
                                    </div>
                                </div>
                            ),
                            search: false,
                        },
                        actions: {
                            render: (_, row) => [
                                <Button
                                    type="link"
                                    key="detail"
                                    onClick={() => {
                                        setIsModalOpen(true)
                                        setList(row)
                                    }}
                                >
                                    查看订单信息
                                </Button>,
                                <Button
                                    type="link"
                                    key="copy"
                                    icon={<CopyOutlined />}
                                    onClick={() => {
                                        const text =
                                            `订单号：${row.orderNo}，\n收货人：${row.customerName}，\n联系方式：${row.customerPhone}，\n地址：${row.customerAddress}，\n订单状态：${row.status}`;
                                        navigator.clipboard.writeText(text).then(() => {
                                            message.success({
                                                content: '已复制至剪切板',
                                                style: { marginTop: '40vh' },
                                            });
                                        });
                                    }}
                                >
                                    复制
                                </Button>,
                            ],
                            search: false,
                        },
                        customerName: {
                            title: '客户名',
                            dataIndex: 'customerName',
                        },
                        status: {
                            // 自己扩展的字段，主要用于筛选，不在列表中显示
                            title: '订单状态',
                            dataIndex: 'status',
                            valueType: 'select',
                            valueEnum: {
                                待付款: '待付款',
                                待发货: '待发货',
                                待安装: '待安装',
                                已完成: '已完成',
                            }
                        },
                    }}
                />
            </Space>
            <ModalForm
                title="订单信息"
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                formRef={formRef}
                onChange={setList}
                autoFocusFirstInput
                onFinish={async () => {
                    message.success('提交成功');
                    setIsModalOpen(false)
                    return true;
                }}

            >
                <ProForm.Group label="客户信息">
                    <ProFormText
                        width="md"
                        name="customerName"
                        label="收货人"
                        readonly
                        value={list.customerName}
                    />
                    <ProFormText
                        width="md"
                        name="customerPhone"
                        label="联系方式"
                        readonly
                        value={list.customerPhone}
                    />
                    <ProFormText
                        width="md"
                        name="customerAddress"
                        label="地址"
                        readonly
                        value={list.customerAddress}
                    />
                </ProForm.Group>
                <ProForm.Group label="订单详情">
                    <ProFormText
                        width="md"
                        name="orderNo"
                        label="订单号"
                        readonly
                        value={list.orderNo}
                    />
                    <ProFormText
                        width="md"
                        name="product"
                        label="产品"
                        readonly
                        value={list.product}
                    />
                    <ProFormText
                        width='xs'
                        name="model"
                        label="型号"
                        value={list.model}
                    />
                    <ProFormDigit
                        width='xs'
                        name="price"
                        label="单价（元）"
                        value={list.price}
                    ></ProFormDigit>
                    <ProFormDigit
                        width='xs'
                        name="quantity"
                        label="数量"
                        value={list.quantity}
                        min={1}
                    ></ProFormDigit>
                    <ProFormDigit
                        width='xs'
                        name="totalPrice"
                        label="总价"
                        readonly
                        value={list.totalPrice}
                        min={1}
                    ></ProFormDigit>
                    <ProFormDateTimePicker
                        name="orderTime"
                        label="下单时间"
                        readonly
                        value={list.orderTime}
                    />
                    <ProFormDateTimePicker
                        name="deliveryTime"
                        label="发货时间"
                        readonly
                        value={list.deliveryTime}
                    />
                    <ProFormDateTimePicker
                        name="arrivalTime"
                        label="收货时间"
                        readonly
                        value={list.arrivalTime}
                    />
                    <ProFormSelect
                        rules={[{
                            required: true,
                            message: "必填"
                        },]}
                        label="订单状态"
                        name="status"
                        initialValue={list.status}
                        valueEnum={{
                            step1: '待付款',
                            step2: '待发货',
                            step3: '待安装',
                            step4: '已完成',
                        }}
                    />
                    <ProFormSelect
                        rules={[{
                            required: true,
                            message: "必填"
                        },]}
                        label="支付方式"
                        name="paymentMethod"
                        initialValue={list.paymentMethod}
                        valueEnum={{
                            method1: '在线支付',
                            method2: '货到付款',
                            method3: '银行转账',
                        }}
                    />
                </ProForm.Group>
                <ProForm.Group label="安装信息">
                    <ProFormText
                        width='sm'
                        name="installers"
                        label="安装师傅"
                        value={list.installers}
                    />
                    <ProFormDateTimePicker
                        name="installationTime"
                        label="安装时间"
                        readonly
                        value={list.installationTime}
                    />
                </ProForm.Group>
                <ProForm.Item
                    label="订单评论"
                    name="comments"
                    trigger="onValuesChange"
                >
                    <EditableProTable
                        rowKey="id"
                        recordCreatorProps={false}
                        toolBarRender={false}
                        onChange={setList}
                        value={list.comments}
                        columns={[
                            {
                                title: "客户姓名",
                                dataIndex: 'user',
                                editable: false,
                            },
                            {
                                title: "评论内容",
                                dataIndex: 'content',
                                editable: false,
                                // render(val) {
                                //     return `${val.min_quantity}${val.value_unit}-${val.max_quantity}${val.value_unit}`;
                                // },
                            },
                            {
                                title: "评论时间",
                                // tip: intl.formatMessage({ id: 'Package.SetAttributePrompt' }),
                                dataIndex: 'time',
                                valueType: 'date',
                                // fieldProps: {
                                //     min: -1,
                                // },
                                editable() {
                                    return true;
                                },
                            },
                            {
                                title: "操作",
                                valueType: 'option',
                                render(dom, entity, index, action) {
                                    return [
                                        <Button
                                            type="link"
                                            key="delete"
                                            onClick={() => {
                                                // setItems(items?.filter((attr) => attr.id !== entity.id));
                                            }}
                                        >
                                            删除
                                        </Button>,
                                    ];
                                },
                            },
                        ]}
                    />
                </ProForm.Item>
            </ModalForm>
        </>
    );
}
export default Order;
