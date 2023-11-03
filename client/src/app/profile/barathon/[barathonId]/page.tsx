'use client'

const BarathonIdPage = ({ params }: { params: { barathonId: string } }) => {
  console.log(params?.barathonId)
  return (
    <div>
      <div>Hello</div>
    </div>
  )
}

export default BarathonIdPage
