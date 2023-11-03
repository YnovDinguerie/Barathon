import { getBarathonsType } from '@/types/barathon/input'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

type getBarathonsCard = Omit<
  getBarathonsType,
  'radius' | 'user_id' | 'time' | 'updated_at'
>

const BarathonCard = ({ id, name, created_at, city }: getBarathonsCard) => {
  const router = useRouter()
  return (
    <div
      className="bg-[#FFFDF9] h-20 rounded border p-2 flex items-center justify-between"
      key={id}
    >
      <h1 className="font-medium">{name}</h1>
      <p>{format(new Date(created_at), 'dd/MM/yyyy HH:mm:ss')}</p>

      <div className="flex flex-col">
        <p>{city}</p>
      </div>
      <button
        className="bg-[#DF9928] rounded-lg h-10 p-2 font-sans mx-3"
        onClick={() => router.push(`/profile/barathon/${id}`)}
      >
        Voir
      </button>
    </div>
  )
}

export default BarathonCard
