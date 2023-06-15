import { Request, Response } from 'express';
import mockjs from 'mockjs';

const clients = mockjs.mock({
  'list|20': [
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
