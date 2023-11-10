'use client'

import getBarathons from '@/app/api/barathon/getBarathons'
import Statistics from '@/components/stats/Statistics'
import { toastAtom, userAtom } from '@/state'
import { useQuery } from '@tanstack/react-query'
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
  const data = [
    { name: '01/11/2023', value: 5 },
    { name: '05/11/2023', value: 10 },
    { name: '06/11/2023', value: 3 },
    { name: '10/11/2023', value: 5 },
  ]
  return (
    <div>
      <Statistics data={data} />
    </div>
  )
}

export default Stats
