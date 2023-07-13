import { request } from '@umijs/max';
import { ActionType, DrawerForm, ProForm, ProFormCascader, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Popconfirm, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FormattedMessage } from '@umijs/max';
import { Link } from 'react-router-dom';

const ClientList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [remainingTime, setRemainingTime] = useState(3)
  interface Client {
    id: number;
    name: string;
    age: number;
    gender: string;
    phone: string;
    birthday: string;
    job: string;
    education: string;
    address: string;
    status: string;
  }
  const columns: ProColumns<Client>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      render(val, record) {
        return (
          <>
            <Link to={`/client-manage/detail/${record.id}`}>{val}</Link>
          </>
        )
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      search: false,
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      search: false,
    },
    {
      title: '职业',
      dataIndex: 'job',
      key: 'job',
      search: false,
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      search: false,
    },
    {
      title: '地址',
      dataIndex: 'address',
      search: false,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      search: false,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   search: false,
    //   render(val, record) {
    //     return (
    //       <>
    //         <Popconfirm
    //           title="请确认"
    //           description={
    //             record.status === "停用" ?
    //               "确认要启用该客户吗？" :
    //               "确认要禁用该客户吗？"
    //           }
    //           onConfirm={() => {
    //             setIsModalOpen(true);
    //           }}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Button type="link">
    //             {record.status === "停用" ? "启用" : "禁用"}
    //           </Button>
    //         </Popconfirm>
    //       </>
    //     )
    //   }
    // },
  ];
  return (
    <>
      <ProTable<Client>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const response = await request('/api/clients');
          let data = response;
          if (params.name) {
            data = data.filter((item) => item.name.indexOf(params.name) !== -1);
          }
          if (params.phone) {
            data = data.filter((item) => item.phone.indexOf(params.phone) !== -1);
          }
          if (params.status) {
            data = data.filter((item) => item.status === params.status);
          }
          return {
            data: data,
            total: data.length,
          };
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setIsDrawerOpen(true)
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
      />
      <Modal
        title="提示"
        visible={isModalOpen}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={() => setIsModalOpen(false)}>
            {`确认(${remainingTime}s)`}
          </Button>
        ]}
      >
        成功！
      </Modal>
      <DrawerForm
        title="新建客户"
        // initialValues={selectedClient}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
        }}
        submitTimeout={2000}
        onFinish={async () => {
          message.success('提交成功');
          setIsDrawerOpen(false)
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="name"
            width="md"
            label="客户姓名"
          // initialValue={selectedClient?.name}
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            name="age"
            label="年龄"
          // initialValue={selectedClient?.age}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'male',
                label: '男',
              },
              {
                value: 'famale',
                label: '女',
              },
            ]}
            width="md"
            name="gender"
            label="性别"
          />
          <ProFormText
            width="md"
            name="phone"
            label="电话号码"
          // initialValue={selectedClient?.phone}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDatePicker
            name="date"
            label="出生日期"
            transform={(value) => {
              return {
                date: moment(value).unix(),
              };
            }}
          />
          <ProFormSelect
            width="md"
            name="job"
            label="职业"
            options={[
              {
                value: 'student',
                label: '学生',
              },
              {
                value: 'officeWorker',
                label: '上班族',
              },
              {
                value: 'freelancer',
                label: '自由职业者',
              },
              {
                value: 'entrepreneur',
                label: '企业家',
              },
              {
                value: 'retiree',
                label: '退休人士',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="education"
            label="学历"
            options={[
              {
                value: 'junior',
                label: '初中及以下',
              },
              {
                value: 'high',
                label: '高中',
              },
              {
                value: 'juniorCollege',
                label: '大专',
              },
              {
                value: 'undergraduate',
                label: '本科',
              },
              {
                value: 'master',
                label: '硕士及以上',
              },
            ]}
          />
          <ProFormCascader
            width="md"
            request={async () => [
              {
                value: 'zhejiang',
                label: '浙江省',
                children: [
                  {
                    value: 'hangzhou',
                    label: '杭州市',
                    children: [
                      {
                        value: 'yuhang',
                        label: '余杭区',
                      },
                      {
                        value: 'shangcheng',
                        label: '上城区',
                      },
                    ],
                  },
                  {
                    value: 'jinhua',
                    label: '金华',
                    children: [
                      {
                        value: 'wucheng',
                        label: '婺城区',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: '江苏省',
                children: [
                  {
                    value: 'nanjing',
                    label: '南京市',
                    children: [
                      {
                        value: 'jiangning',
                        label: '江宁区',
                      },
                      {
                        value: 'jianye',
                        label: '建邺区',
                      },
                    ],
                  },
                  {
                    value: 'wuxi',
                    label: '无锡市',
                    children: [
                      {
                        value: 'xishan',
                        label: '锡山区',
                      },
                      {
                        value: 'binhu',
                        label: '滨湖区',
                      },
                    ],
                  },
                ],
              },
            ]}
            name="areaList"
            label="区域"
          />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};

export default ClientList;
