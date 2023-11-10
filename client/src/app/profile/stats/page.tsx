'use client'

import { ActiveShapeProps } from '@/types/stats'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  LabelList,
  Cell,
  Sector,
} from 'recharts'

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  // percent,
  value,
}: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Visited bars ${value}`}</text>
    </g>
  )
}

const Stats = () => {
  const router = useRouter()
  const [activeState, setActiveState] = useState({
    activeIndex: 0,
  })
  const data = [
    { name: '01/11/2023', value: 5 },
    { name: '05/11/2023', value: 10 },
    { name: '06/11/2023', value: 3 },
    { name: '10/11/2023', value: 5 },
  ]

  const onPieEnter = (_: any, index: number) => {
    setActiveState({
      activeIndex: index,
    })
  }

  const colors = ['#49ff33', '#3396ff', '#6833ff', '#ff33d1']
  return (
    <div className="h-screen">
      <div className="flex ml-3">
        <Image
          src="/assets/arrow-left.svg"
          onClick={() => router.push('/profile')}
          className="cursor-pointer"
          alt="arrow"
          height={20}
          width={20}
        />
        <div className="text-center font-medium m-2 ml-3 text-xl">
          Statistiques
        </div>
      </div>
      <div className="text-center font-medium">Bars visités</div>
      <ResponsiveContainer width="100%" height="40%">
        <PieChart width={200} height={400}>
          <LabelList>Bars visités</LabelList>
          <Pie
            data={data}
            dataKey="value"
            activeShape={renderActiveShape}
            activeIndex={activeState.activeIndex}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Stats
