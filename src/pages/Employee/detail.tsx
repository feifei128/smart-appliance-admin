import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { request, useParams } from '@umijs/max';
import { Card } from 'antd';

const DemoLine = () => {
    const { id } = useParams<{ id: number }>();
    const [data, setData] = useState([]);

    useEffect(() => {
        // 模拟异步请求数据
        const mockFetchClient = async () => {
            const response = await request(`/api/employees`);
            let data = response.filter(
                (item) => item.id == id
            )[0]
            let signIn = data.attendance.map(item => {
                return {
                    time: item.date,
                    value: item.signIn,
                    category: '签到时间'
                }
            })
            let signOut = data.attendance.map(item => {
                return {
                    time: item.date,
                    value: item.signOut,
                    category: '签退时间'
                }
            })
            setData([...signIn, ...signOut]);
        };
        mockFetchClient();
    }, [id]);

    const config = {
        data,
        xField: 'time',
        yField: 'value',
        seriesField: 'category',
        // xAxis: {
        //     type: 'time',
        // },
        // yAxis: {
        //     label: {
        //         // 数值格式化为千分位
        //         formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        //     },
        // },
        slider: {
            start: 0,
            end: 0.5,
        },
    };

    return (
        <>
            <Card bordered={false} title="近一月考勤记录">
                <Line {...config} />
            </Card>
        </>
    )
};
export default DemoLine;
