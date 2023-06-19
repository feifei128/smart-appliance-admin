import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { request, useParams } from '@umijs/max';
import { Card } from 'antd';
import dayjs from 'dayjs';

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
        padding: 'auto',
        xField: 'time',
        yField: 'value',
        seriesField: 'category',
        xAxis: {
            tickCount: 5,
        },
        slider: {
            start: 0,
            end: 0.5,
        },
        // yAxis: {
        //     label: {
        //         formatter: (val) => dayjs(val).format('YYYY-MM-DD')
        //     },
        // },
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
