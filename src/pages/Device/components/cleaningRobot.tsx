import {
  ProList,
} from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Progress, Tag } from 'antd';
import { Button, Divider, Switch, Tooltip } from 'antd/es';
import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState<boolean>(false);
  return (
    <div
      style={{
        margin: -24,
        padding: 24,
        // backgroundColor: '#ccc'
      }}
    >
      <ProList<any>
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: false,
        }}
        search={{}}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 4 }}
        onItem={(record: any) => {
          return {
            onClick: () => {
              // console.log(record);
            },
          };
        }}
        metas={{
          title: {
            dataIndex: 'name',
            title: '设备名称',
          },
          subTitle: {
            dataIndex: 'id',
            title: '设备ID',
            render(val, record) {
              return <Tag color='cyan'>ID:  {val} </Tag>
            }
          },
          type: {},
          avatar: {},
          content: {
            render: (_, record) => (
              < div style={{ flex: 1 }}>
                <img src={record?.image} alt="卡片图片" />
                <div>生命就像一盒巧克力，结果往往出人意料</div>
              </div>)
          },
          actions: {
            render: (_, row) => [
              <Tooltip
                key="detail"
                title={
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        `品牌：${row.brand}<br />
                          亮度：${row.brightness}%<br />
                          电量：${row.power}%<br />
                          当前状态：${row.isOn ? "开启" : "关闭"}<br />
                          是否定时：${row.isTimerOn ? "是" : "否"}<br />`
                    }} >
                  </span>
                }
              >
                <a key="detail">详情</a>
              </Tooltip >,
              <a key="delete" ><Switch defaultChecked={row.isOn} /></a>
            ],
            cardActionProps: 'actions'
          }
        }}
        request={async (params) => {
          const response = await request('/api/devices');
          let data = response.cleaningRobots;
          console.log(data);

          // if (params.orderNo)
          //   data = data.filter(val => val.orderNo.includes(params.orderNo))
          // if (params.customerName)
          //   data = data.filter(val => val.customerName.includes(params.customerName))
          // if (params.status)
          //   data = data.filter(val => val.status === params.status)
          return {
            data: data,
            total: data.length,
          };
        }}
      />
    </div >
  );
};