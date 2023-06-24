import { Request, Response } from 'express';
import mockjs from 'mockjs';

// 生成订单数据
const orders = mockjs.mock({
  'list|100': [
    {
      orderNo: '@string("number", 8)', // 订单编号，8位数字
      avatar: '@image("100x100", "@color", "@name")',
      customerName: '@cname', // 客户姓名
      customerPhone: /^1[3456789]\d{9}$/, // 客户手机号
      customerAddress: '@city(true)', // 客户地址
      product: '@pick(["智能灯", "智能插座", "智能门锁", "智能摄像头", "智能音响"])', // 产品类型
      model: '@word(5)', // 型号
      quantity: '@integer(1, 10)', // 数量
      price: '@float(500, 5000, 2, 2)', // 单价，范围为 500-5000 元
      totalPrice: function () { // 总价
        return this.quantity * this.price;
      },
      orderTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 下单时间
      deliveryTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 发货时间
      arrivalTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 到货时间
      installationTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 安装时间
      installers: ['@cname', '@cname', '@cname'], // 安装师傅
      status: '@pick(["待付款", "待发货", "待安装", "已完成"])', // 订单状态
      paymentMethod: '@pick(["在线支付", "货到付款", "银行转账"])', // 支付方式
      paymentTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 支付时间
      refundReason: '@cparagraph(1)', // 退款原因
      refundTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 退款时间
      'comments|0-5': [ // 评论
        {
          'id|+1': 1,
          content: '@cparagraph(1, 2)',
          user: '@cname',
          time: '@datetime("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    },
  ],
}).list;

const statistics = mockjs.mock({
  'list|4': [{ // 日、周、月、年
    totalAmonut: '@integer(10000, 30000)',
    visitorsNum: '@integer(300, 10000)',
    ordersNum: '@integer(80, 500)',
    Views: '@integer(500, 2000)',
  }]
}).list

export default {
  // 订单列表 mock 数据
  '/api/orders': (req: Request, res: Response) => {
    const { method } = req;
    if (method === 'GET') {
      return res.json(orders);
    } else {
      return res.status(405).send({
        message: 'Method Not Allowed',
      });
    }
  },
  // 订单统计 mock 数据
  '/api/statistics': (req: Request, res: Response) => {
    const { method } = req;
    if (method === 'GET') {
      return res.json(statistics);
    } else {
      return res.status(405).send({
        message: 'Method Not Allowed',
      });
    }
  },
};
