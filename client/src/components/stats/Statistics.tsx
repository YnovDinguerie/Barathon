import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts'
import { ActiveShapeProps, StatsInterface } from '@/types/stats'

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
}: ActiveShapeProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${value}`}
    </text>
  )
}

interface StatisticsProps {
  data: StatsInterface[]
}

const Statistics = ({ data }: StatisticsProps) => {
  const router = useRouter()

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
        <PieChart width={200} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Legend verticalAlign="top" height={36} />
          <Line
            name="pv of pages"
            type="natural"
            dataKey="pv"
            stroke="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Statistics
