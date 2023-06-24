import type { FC } from 'react';
import { Avatar, Col, List, Skeleton, Row, Statistic } from 'antd';
import { Radar } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import WordCard from './components/wordCard';
const { Divider } = ProCard;
const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div >
      <div >
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div >
        <div >
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const Workplace: FC = () => {

  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a >{item.user.name}</a>
              &nbsp;
              <span >{events}</span>
            </span>
          }
          description={
            <span title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer
      content={
        <ProCard>
          <ProCard colSpan="10%">
            <img
              src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
              style={{ width: 60 }}
            ></img>
          </ProCard>
          <ProCard colSpan="50%">
            <div style={{ fontSize: 24 }}>早安，吴彦祖，祝你开心每一天！</div>
            <div style={{ color: '##000072' }}>工程师 | 商汤科技－某某某事业群－某某平台部－某某技术部－UED</div>
          </ProCard>
          <ProCard.Group direction={'row'}>
            <ProCard>
              <Statistic title="项目数" value={61} precision={0} />
            </ProCard>
            <Divider type={'vertical'} />
            <ProCard>
              <Statistic title="团队内排名" value='8/24' precision={2} />
            </ProCard>
            <Divider type={'vertical'} />
            <ProCard>
              <Statistic title="信息完整度" value='93%' />
            </ProCard>
          </ProCard.Group>
        </ProCard>
      }
    >
      <WordCard />
    </PageContainer >
  );
};

export default Workplace;
