import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummy = [
  {
    Week: 'Week 1',
    students: 2,
    },
  {
    Week: 'Week 2',
    students: 1,
    },
  {
    Week: 'Week 3',
    students: 9,
    },
  {
    Week: 'Week 4',
    students: 3,
    },
  {
    Week: 'Week 5',
    students: 4,
    },
  {
    Week: 'Week 6',
    students: 3,
    },
  {
    Week: 'Week 7',
    students: 4,
    },
];

const LineGraph=({graphData})=> {
  const [data,setData] = useState()  
  
  useEffect(()=>{
    console.log(data,'datadata')
    setData(graphData)
  },[graphData])

     return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 8" />
          <XAxis dataKey="Xvalue" />
          <YAxis dataKey="students"/>
          <Tooltip />
          <Legend />
          <Line type="monotone"  dataKey="students" stroke="#FFFFFF" />
           
        </LineChart>
      </ResponsiveContainer>
    );
  
}

export default LineGraph