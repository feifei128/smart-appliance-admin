import { Request, Response } from 'express';
import mockjs from 'mockjs';

const devices = mockjs.mock({
  list: {
    'lights|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["吊灯", "床头灯", "台灯","壁灯", "落地灯", "情景灯"])', //'@pick(["吊灯", "床头灯", "台灯", "壁灯", "落地灯","情景灯", "智能灯泡“])',
        brand: '@pick(["小米", "华为", "海尔"])',
        type: '灯具',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Lights`;
        },
        brightness: '@integer(0, 100)',
        colorTemperature: '@integer(2700, 6500)',
        power: '@float(0, 100, 1, 1)',
        isOn: '@boolean()',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()', // 设备是否定时开启
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'sockets|20': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["迷你插座", "无线插座", "定时插座"])',
        brand: '@pick(["小米", "华为", "公牛"])',
        type: '插座',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Sockets`;
        },
        status: '@pick(["在线", "离线"])',
        networkType: '@pick(["Wi-Fi", "ZigBee", "蓝牙"])',
        firmwareVersion: '@pick(["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"])',
        softwareVersion: '@pick(["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"])',
        power: '@float(0, 2000, 1, 1)',
        energyConsumption: '@float(0, 1000, 1, 1)',
        isOn: '@boolean()',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'curtains|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["卷帘", "竖帘", "罗马帘", "百叶窗帘", "智能窗帘电机", "遮光窗帘"])',
        brand: '@pick(["小米", "华为"])',
        type: '窗帘',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Curtains`;
        },
        status: '@pick(["开", "关"])',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'locks|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["指纹门锁", "卡片门锁", "APP门锁", "蓝牙门锁"])',
        brand: '@pick(["亿万先生", "小米"])',
        type: '门锁',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Locks`;
        },
        status: '@pick(["已连接", "已断开", "设备异常"])',
        isAuto: '@boolean()',
      },
    ],
    'speakers|50': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["蓝牙音箱", "语音助手", "智能音频"])',
        brand: '@pick(["小米", "华为", "Apple"])',
        type: '音响',
        status: '@pick(["在线", "离线"])',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Speakers`;
        },
        networkType: '@pick(["Wi-Fi", "ZigBee", "蓝牙"])',
        firmwareVersion: '@pick(["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"])',
        softwareVersion: '@pick(["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"])',
        volume: '@integer(0, 100)',
        isMute: '@boolean()',
        isPlaying: '@boolean()',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'TVs|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["液晶电视", "曲面电视", "智能电视盒", "投影电视"])',
        brand: '@pick(["小米", "华为", "TCL"])',
        type: '电视',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-TVs`;
        },
        size: '@integer(40, 100)',
        status: '@pick(["开", "关"])',
        isMute: '@boolean()',
        volume: '@integer(0, 100)',
        channel: '@integer(0, 999)',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'airConditioners|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["挂式空调", "中央空调", "柜式空调", "迷你空调","智能风扇"])',
        brand: '@pick(["小米", "美的", "格力"])',
        type: '空调',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Airs`;
        },
        status: '@pick(["开", "关"])',
        coolingTemperature: '@integer(16, 30)',
        heatingTemperature: '@integer(16, 30)',
        mode: '@pick(["制冷", "制热", "除湿", "送风"])',
        windSpeed: '@pick(["自动", "低风", "中风", "高风"])',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'cleaningRobots|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["扫地机器人", "除螨机器人", "智能吸尘器"])',
        brand: '@pick(["小米", "戴森"])',
        type: '扫地机器人',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Cleaning`;
        },
        status: '@pick(["工作中", "待机中", "设备异常"])',
        battery: '@integer(0, 100)',
        mode: '@pick(["标准模式", "强力模式", "静音模式"])',
        isAuto: '@boolean()',
        isTimerOn: '@boolean()',
        timerOnTime: '@time("HH:mm:ss")',
        timerOffTime: '@time("HH:mm:ss")',
      },
    ],
    'refrigerators|30': [
      {
        id: '@string("number", 8)',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        name: '@pick(["多门冰箱", "对开门冰箱", "宿舍冰箱"])',
        brand: '@pick(["海尔", "西门子"])',
        type: '冰箱',
        color: '@color',
        image: function () {
          return `http://dummyimage.com/200x100/${this.color.slice(1)}&text=Mockjs-Refrigerators`;
        },
        status: '@pick(["开", "关"])',
        temperature: '@integer(-20, 10)',
        isHolidayModeOn: '@boolean()',
        isQuickFreezeOn: '@boolean()',
        isQuickCoolOn: '@boolean()',
        isChildLockOn: '@boolean()',
        capacity: '@pick(["630L", "310L", "40L"])',
        size: '@pick(["90cm*180cm*70cm", "70cm*100cm*50cm", "60cm*60cm*60cm"])',
      },
    ],
  },
}).list;

export default {
  // 客户列表 mock 数据
  '/api/devices': (req: Request, res: Response) => {
    const { method } = req;
    if (method === 'GET') {
      res.setHeader('Access-Control-Allow-Origin', '*'); // 添加响应头
      return res.json(devices);
    } else {
      return res.status(405).send({
        message: 'Method Not Allowed',
      });
    }
  },
};
