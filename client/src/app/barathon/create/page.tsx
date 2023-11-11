'use client'

import createBarathon from '@/app/api/barathon/createBarathon'
import addBarathonToBars from '@/app/api/bars/addBarToBarathon'
import getBars from '@/app/api/bars/getBars'
import RangeInput from '@/components/Input/RangeInput'
import { toastAtom, userAtom } from '@/state'
import { BarType } from '@/types/barathon/input'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

const CreateBarathon = () => {
  const [barRadius, setBarRadius] = useState<number>(0)
  const [barathonName, setBarathonName] = useState<string>('')
  const [barathonTime, setBarathonTime] = useState<string>('')
  const [barathonCity, setBarathonCity] = useState<string>('')
  const [barSelected, setBarSelected] = useState<BarType[]>([])

  const router = useRouter()

  const { token } = useAtomValue(userAtom)
  const setToast = useSetAtom(toastAtom)

  const handleRangeRadiusChange = (barRadius: number) => {
    setBarRadius(barRadius)
  }

  const saveBarathonName = (e: ChangeEvent<HTMLInputElement>) => {
    setBarathonName(e.target.value)
  }

  const saveBarathonTime = (e: ChangeEvent<HTMLInputElement>) => {
    setBarathonTime(e.target.value)
  }

  const saveBarathonCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setBarathonCity(e.target.value)
  }

  const selectBar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setBarSelected([...barSelected, e.target.value as unknown as BarType])
    } else {
      setBarSelected(
        barSelected.filter(
          (bar) => bar !== (e.target.value as unknown as BarType),
        ),
      )
    }
  }

  const { data: bars } = useQuery({
    queryKey: ['bars'],
    queryFn: () =>
      getBars({
        latitude: -0.5729089,
        longitude: 44.8627513,
        radius: barRadius,
        token: token,
      }),
    refetchInterval: 1000,
  })

  // console.log(barSelected)
  const submitCreateBarathon = () => {
    createBarathon({
      name: barathonName,
      city: barathonCity,
      radius: barRadius,
      time: barathonTime,
      token: token,
    })
      .then(() => {
        setToast({
          isVisible: true,
          msg: 'Barahton successfuly created',
          status: 'Success',
        })
        router.push('/home')
      })
      .catch((error) => {
        setToast({
          isVisible: true,
          msg: error.response.data.message,
          status: 'Error',
        })
      })
  }
  return (
    <div className="bg-[#FFFDF9] h-screen">
      <div className="font-bold font-sans text-xl text-center mt-10 text-[#DF9928]">
        A nous de créer notre Barathon
      </div>
      <div className="flex flex-col space-y-10 mt-14">
        <div className="flex flex-col space-y-2">
          <label className="ml-3 font-medium">Nom du Barathon</label>
          <input
            type="text"
            placeholder="Nom du Barathon"
            onChange={saveBarathonName}
            className="border-2 bg-[#FFFDF9] placeholder:text-black rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
        </div>
        <div className="flex flex-col space-y-2 font-medium">
          <label className="ml-3">Heure du barathon</label>
          <input
            type="time"
            placeholder="Heure"
            onChange={saveBarathonTime}
            className="border-2 bg-[#FFFDF9] placeholder:text-black rounded-lg h-10 ml-3 mt-5 focus:border-[#DF9928] mx-3"
          />
        </div>
        <div className="mx-3 flex flex-col space-y-2">
          <label className="font-medium">Rayon des bars ({barRadius} km)</label>
          <RangeInput
            min={2}
            max={10}
            onRangeChange={handleRangeRadiusChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="ml-3 font-medium">Ville</label>
          <select
            onChange={saveBarathonCity}
            className="border rounded-lg mx-3 bg-[#FFFDF9]"
          >
            <option>Bordeaux</option>
            <option>Bayonne</option>
          </select>
        </div>
        {/* <div className="ml-3 font-medium">
          Bars (sélectionner plusieurs bars)
        </div> */}
        {/* <div>
          {bars
            ?.filter((bar: any) => bar.name !== null)
            .map((bar) => {
              return (
                <div key={bar.id} className="flex flex-col space-y-2 mx-3">
                  <div className="flex space-x-1">
                    <input
                      id="bar"
                      name="bar"
                      type="checkbox"
                      value={bar.name}
                      onChange={selectBar}
                    />
                    <label htmlFor="bar">{bar.name}</label>
                  </div>
                </div>
              )
            })}
        </div> */}
        <button
          className="mx-3 bg-[#DF9928] rounded-lg p-2"
          onClick={submitCreateBarathon}
        >
          Enregister le barathon
        </button>
      </div>
    </div>
  )
}

export default CreateBarathon
