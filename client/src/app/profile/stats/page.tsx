'use client'

import Statistics from '@/components/stats/Statistics'

const Stats = () => {
  const data = [
    { name: '01/11/2023', value: 5 },
    { name: '05/11/2023', value: 10 },
    { name: '06/11/2023', value: 3 },
    { name: '10/11/2023', value: 5 },
  ]
  return (
    <div className="container">
      <Statistics data={data} />
    </div>
  )
}

export default Stats
