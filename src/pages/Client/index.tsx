import { request } from '@/.umi/plugin-request/request';
import { ActionType } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React, { useRef } from 'react';

const ClientList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  interface Client {
    id: number;
    name: string;
    phone: string;
    address: string;
  }
  const columns: ProColumns<Client>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '职业',
      dataIndex: 'job',
      key: 'job',
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ];

  return (
    <PageContainer>
      <ProTable<Client>
        columns={columns}
        actionRef={actionRef}
        request={async () => {
          const response = await request('/api/clients');
          return {
            data: response,
            total: response.length,
          };
        }}
      />
    </PageContainer>
  );
};

export default ClientList;
