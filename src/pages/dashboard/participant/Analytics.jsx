import React from 'react'
import { axiosSecure } from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import DashboardTitleLayout from '../../../layouts/DashboardTitleLayout'
import AnalyticCard from '../../../components/cards/AnalyticCard'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const COLORS = ['#0088FE', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};




const Analytics = () => {

    const { data: stats = {}, isLoading, refetch } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/participant-stats/`)
            return data
        },
    })

    const pieChartData = [
        { name: 'Paid', value: stats?.totalPaid },
        { name: 'Unpaid', value: stats?.totalRegistered - stats?.totalPaid },
    ]

    console.log(stats)
    return (
        <DashboardTitleLayout title={'Participant Analytics Dashboard'}>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-3'>
                <AnalyticCard title={'Total Registered'} value={stats?.totalRegistered} iconName={'total'} />
                <AnalyticCard title={'Total Paid Amount'} value={`$${stats?.totalPayment}`} iconName={'calculate'} />
            </div>
            <div className='mt-10 p-0 flex flex-col md:flex-row gap-3'>
                <Card className="flex-1 border">
                    <CardBody className='h-[400px]'>
                        <Typography variant="h5" color="blue-gray" className="mb-2 text-[16px]">
                            Location Wise Camp Registration
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%" >
                            <BarChart
                                width={500}
                                height={400}
                                data={stats?.locationWiseCount}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="location" className='text-[12px]' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
                <Card className="flex-1 border">
                    <CardBody className='h-[400px]'>
                        <Typography variant="h5" color="blue-gray" className="mb-2 text-[16px]">
                            Paid/Unpaid Ratio
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    labelLine={false}
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    label={renderCustomizedLabel}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                    <CardFooter className="pt-0">
                    </CardFooter>
                </Card>
            </div>
        </DashboardTitleLayout>
    )
}

export default Analytics
