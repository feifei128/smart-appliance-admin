import { StatisticCard } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Radio } from 'antd/es';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';

const imgStyle = {
    display: 'block',
    width: 42,
    height: 42,
};

export default () => {
    const [responsive, setResponsive] = useState(false);
    const [statistics, setStatistics] = useState([]);
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        // 模拟异步请求数据
        const mockFetchClient = async () => {
            const response = await request(`/api/statistics`);
            setStatistics(response);
        };
        mockFetchClient();
    }, []);
    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >
            <Radio.Group
                defaultValue="a"
                buttonStyle="solid"
                style={{ float: 'right', marginBottom: 20 }}
            >
                <Radio.Button value="a" onClick={() => setIdx(0)}>日</Radio.Button>
                <Radio.Button value="b" onClick={() => setIdx(1)}>周</Radio.Button>
                <Radio.Button value="c" onClick={() => setIdx(2)}>月</Radio.Button>
                <Radio.Button value="d" onClick={() => setIdx(3)}>年</Radio.Button>
            </Radio.Group>
            <StatisticCard.Group
                direction={responsive ? 'column' : 'row'}
            >
                <StatisticCard
                    statistic={{
                        title: '支付金额',
                        value: statistics[idx]?.totalAmonut,
                        icon: (
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        ),
                    }}
                />
                <StatisticCard
                    statistic={{
                        title: '访客数',
                        value: statistics[idx]?.visitorsNum,
                        icon: (
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        ),
                    }}
                />
                <StatisticCard
                    statistic={{
                        title: '成功订单数',
                        value: statistics[idx]?.ordersNum,
                        icon: (
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        ),
                    }}
                />
                <StatisticCard
                    statistic={{
                        title: '浏览量',
                        value: statistics[idx]?.Views,
                        icon: (
                            <img
                                style={imgStyle}
                                src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                                alt="icon"
                            />
                        ),
                    }}
                />
            </StatisticCard.Group>
        </RcResizeObserver >
    );
};