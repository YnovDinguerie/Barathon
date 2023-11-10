'use client'

import getBarathons from '@/app/api/barathon/getBarathons'
import getBarathonBars from '@/app/api/bars/getBrathonBars'
import Statistics from '@/components/stats/Statistics'
import { toastAtom, userAtom } from '@/state'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useAtomValue, useSetAtom } from 'jotai'

const Stats = () => {
  const { token } = useAtomValue(userAtom)
  const setToast = useSetAtom(toastAtom)
  const { data: barathons } = useQuery({
    queryKey: ['barathons'],
    queryFn: () =>
      getBarathons({ userToken: token }).catch((error) => {
        setToast({
          msg: error.response.data.message,
          status: 'Error',
          isVisible: true,
        })
      }),
  })

  const data = barathons?.map((barathon) => {
    return {
      name: format(new Date(barathon.created_at), 'dd/MM/yyyy'),
      value: Number(barathon.radius),
    }
  })

  return (
    <div>
      <Statistics data={data ?? []} />
    </div>
  )
}

export default Stats
