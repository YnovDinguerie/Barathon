import { ActiveShapeProps, StatsInterface } from '@/types/stats'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer
} from 'recharts'

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
    <div className="h-screen bg-[#FFFDF9]">
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
      {
        !data.length && (
          <div className="flex flex-col justify-center space-y-3 items-center h-screen font-medium mx-10">
            <div className="text-xl font-sans">Vous n'avez pas encore de barathons</div>
            <Link href="/barathon/create" className="bg-[#DF9928] text-center w-full rounded-lg h-10 p-2 font-sans">Créer un barathon</Link>
          </div>
        )
      }
      {
        data.length !== 0 && (
          <>
          <div className="text-center font-medium">Nombre de km parcouru</div>
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
            </PieChart>
          </ResponsiveContainer>
          </>
        )
      }
    </div>
  )
}

export default Statistics
