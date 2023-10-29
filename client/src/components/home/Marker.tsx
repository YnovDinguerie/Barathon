import Image from 'next/image'
import { Marker } from 'react-map-gl'

interface ICustomMarker {
  latitude: number
  longitude: number
  color: string
  imgRef?: string
  alt?: string
  children?: React.ReactNode
}

const CustomMarker = ({
  longitude,
  latitude,
  color,
  imgRef,
  alt,
  children,
}: ICustomMarker) => {
  return (
    <Marker longitude={longitude} latitude={latitude} color={color}>
      {imgRef && (
        <Image
          src={imgRef}
          alt={alt ?? 'Brew sprint marke'}
          width={30}
          height={30}
        />
      )}

      {children}
    </Marker>
  )
}

export default CustomMarker
