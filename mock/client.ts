import { Request, Response } from 'express';
import mockjs from 'mockjs';


// 生成客户订单数据
const products = ['智能音箱', '智能灯泡', '智能插座', '智能门锁', '智能摄像头', '智能电视', '智能冰箱'];
const refundMethods = ['原路返回', '退款到钱包余额', '转账到银行卡'];
const inquiryStatus = ['已提交', '已回复', '已解决'];
function generateOrders() {
  const orderStatus = ['已下单', '已付款', '已发货', '已收货', '退货中', '已退款'];
  const shippingMethods = ['顺丰快递', 'EMS', '圆通快递', '中通快递', '韵达快递', '申通快递',];
  const paymentMethods = ['微信支付', '支付宝', '银行转账'];
  const orders = [];
  const count = Math.floor(Math.random() * 5) + 1; // 随机生成 1-5 条订单数据
  for (let i = 0; i < count; i++) {
    const id = mockjs.Random.natural(10000, 99999); // 随机生成 5 位数的订单 ID
    const date = mockjs.Random.date('yyyy-MM-dd', '2018-01-01', '2022-12-31'); // 随机生成订单日期，限定在 2018-2022 年之间
    const product = mockjs.Random.pick(products); // 随机选择产品名称
    const price = mockjs.Random.float(100, 2000, 2, 2); // 随机生成 100-2000 元的产品价格
    const quantity = mockjs.Random.natural(1, 5); // 随机生成 1-5 个产品数量
    const status = mockjs.Random.pick(orderStatus); // 随机生成订单状态
    const shippingMethod = mockjs.Random.pick(shippingMethods); // 随机生成配送方式
    const shippingFee = mockjs.Random.float(0, 50, 2, 2); // 随机生成 0-50 元的运费
    const paymentMethod = mockjs.Random.pick(paymentMethods); // 随机生成支付方式
    const paymentTime = mockjs.Random.date('yyyy-MM-dd', date); // 随机生成支付时间，晚于下单时间
    const refundMethod = mockjs.Random.pick(refundMethods); // 随机生成退款方式
    const refundTime = mockjs.Random.date('yyyy-MM-dd', paymentTime); // 随机生成退款时间，晚于支付时间
    orders.push({
      id,
      date,
      product,
      price,
      quantity,
      status,
      shippingMethod,
      shippingFee,
      paymentMethod,
      paymentTime,
      refundMethod,
      refundTime,
    });
  }
  return orders;
}
// 生成产品咨询记录的模拟数据
function generateProductInquiries() {
  const inquiries = [];
  const count = Math.floor(Math.random() * 10) + 1; // 随机生成 1-10 条咨询记录
  for (let i = 0; i < count; i++) {
    const id = mockjs.Random.natural(10000, 99999); // 随机生成 5 位数的咨询 ID
    const date = mockjs.Random.date('yyyy-MM-dd', '2018-01-01', '2022-12-31'); // 随机生成咨询日期，限定在 2018-2022 年之间
    const product = mockjs.Random.pick(products); // 随机选择咨询的产品名称
    const type = '产品咨询'; // 固定为产品咨询
    const status = mockjs.Random.pick(inquiryStatus); // 随机生成咨询状态
    const content = mockjs.Random.paragraph(); // 随机生成咨询内容
    const reply = status === '已回复' ? mockjs.Random.paragraph() : null; // 如果咨询状态为已回复，则随机生成回复内容，否则回复内容为 null
    inquiries.push({
      id,
      date,
      product,
      type,
      content,
      reply,
    });
  }
  return inquiries;
}
// 生成售后记录的模拟数据
function generateAfterSales() {
  const afterSales = [];
  const count = Math.floor(Math.random() * 10) + 1; // 随机生成 1-10 条售后记录
  for (let i = 0; i < count; i++) {
    const id = mockjs.Random.natural(10000, 99999); // 随机生成 5 位数的售后 ID
    const date = mockjs.Random.date('yyyy-MM-dd', '2018-01-01', '2022-12-31'); // 随机生成售后日期，限定在 2018-2022 年之间
    const product = mockjs.Random.pick(products); // 随机选择售后的产品名称
    const type = '售后咨询'; // 固定为售后咨询
    const status = mockjs.Random.pick(['已解决', '未解决']); // 随机生成售后状态
    const reason = mockjs.Random.paragraph(); // 随机生成售后原因
    const refundMethod = status === '已解决' ? mockjs.Random.pick(refundMethods) : null; // 如果售后状态为已解决，则随机生成退款方式，否则退款方式为 null
    const refundAmount = status === '已解决' ? mockjs.Random.float(100, 2000, 2, 2) : null; // 如果售后状态为已解决，则随机生成退款金额，否则退款金额为 null
    afterSales.push({
      id,
      date,
      product,
      type,
      status,
      reason,
      refundMethod,
      refundAmount,
    });
  }
  return afterSales;
}
const clients = mockjs.mock({
  'list|50': [
    {
      'id|+1': 1,
      name: '@cname',
      age: '@integer(18, 60)',
      gender: '@pick(["男", "女"])',
      birthday: '@date("yyyy-MM-dd")',
      job: '@pick(["学生", "上班族", "自由职业者", "企业家", "退休人士"])',
      education: '@pick(["初中及以下", "高中", "大专", "本科", "硕士及以上"])',
      phone: /^1[3456789]\d{9}$/,
      address: '@city',
      status: '@pick(["活跃", "停用"])',
      lastConsumptionTime: '@date("yyyy-MM-dd")',
      orders: generateOrders(), // 添加订单数据
      productInquiries: generateProductInquiries(), // 添加产品咨询记录数据
      afterSales: generateAfterSales(), // 添加售后记录数据
    },
  ],
}).list;

export default {
  // 客户列表 mock 数据
  '/api/clients': (req: Request, res: Response) => {
    const { method } = req;
    if (method === 'GET') {
      return res.json(clients);
    } else {
      return res.status(405).send({
        message: 'Method Not Allowed',
      });
    }
  },

};
