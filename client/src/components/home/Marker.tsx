import Image from 'next/image'
import { Marker } from 'react-map-gl'

interface ICustomMarker {
  latitude: number
  longitude: number
  color?: string
  alt?: string
  children?: React.ReactNode
}

const CustomMarker = ({
  longitude,
  latitude,
  color,
  alt,
  children,
}: ICustomMarker) => {
  return (
    <Marker longitude={longitude} latitude={latitude} color={color}>
      <Image
        src="/assets/beer.svg"
        alt={alt ?? 'Brew sprint marke'}
        width={30}
        height={30}
      />

      {children}
    </Marker>
  )
}

export default CustomMarker
