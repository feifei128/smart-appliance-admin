import { ProCard } from '@ant-design/pro-components';
import AirConditioner from './components/airConditioner';
import CleaningRobot from './components/cleaningRobot';
import Curtain from './components/curtain';
import Light from './components/light';
import Lock from './components/lock';
import Refrigerator from './components/refrigerator';
import Socket from './components/socket';
import Speaker from './components/speaker';
import TV from './components/TV';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
      }}
    >
      <ProCard.TabPane key="tab1" tab="灯具">
        <Light />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="插座">
        <Socket />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab3" tab="窗帘">
        <Curtain />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab4" tab="冰箱">
        <Refrigerator />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab5" tab="门锁">
        <Lock />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab6" tab="电视">
        <TV />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab7" tab="音响">
        <Speaker />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab8" tab="扫地机器人">
        <CleaningRobot />
      </ProCard.TabPane>
      <ProCard.TabPane key="tab9" tab="空调">
        <AirConditioner />
      </ProCard.TabPane>
    </ProCard>
  );
};