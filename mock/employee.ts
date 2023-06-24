import { Request, Response } from 'express';
import mockjs from 'mockjs';

// 生成员工记录的模拟数据
const employees = mockjs.mock({
  'list|50': [
    {
      'id|+1': 10001,
      name: '@cname',
      avatar: '@image("100x100", "@color", "@name")',
      age: '@integer(22, 50)',
      gender: '@pick(["男", "女"])',
      birthday: '@date("yyyy-MM-dd")',
      department: '@pick(["研发部", "市场部", "销售部", "客服部", "财务部", "人事部"])',
      position: '@pick(["软件工程师", "硬件工程师", "测试工程师", "市场专员", "销售代表", "客服代表", "财务专员", "人事专员"])',
      entryDate: '@date("yyyy-MM-dd")',
      phone: /^1[3456789]\d{9}$/,
      email: /\w+@\w+\.\w+/,
      address: '@city',
      status: '@pick(["在职", "离职"])',
      salary: '@float(8000, 20000, 2, 2)', // 随机生成工资，范围为 8000-20000 元/月
      'attendance|30': [
        {
          'date|+1': 1,
          signIn: '@pick(["8:00:00", "8:30:00", "9:24:48", "9:35:30", "10:22:24"])',
          signOut: '@pick(["22:00:00", "21:04:33", "19:27:08", "18:35:40", "20:32:01"])',
        },
      ],
      processing: '@float(50, 100, 2)',
      solving: '@float(50, 100, 2)',
      workHours: '@float(6, 12, 1)',
      kpi: '@float(1, 2, 2)',
    },
  ],
}).list;

export default {
  // 客户列表 mock 数据
  '/api/employees': (req: Request, res: Response) => {
    const { method } = req;
    if (method === 'GET') {
      return res.json(employees);
    } else {
      return res.status(405).send({
        message: 'Method Not Allowed',
      });
    }
  },

};
