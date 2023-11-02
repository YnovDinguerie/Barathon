import Header from '@/components/home/Header'
import Image from 'next/image'

const Profile = () => {
  return (
    <div>
      {/* <div className="bg-gray-50 p-3 container-header flex justify-between">
        <div className="flex flex-col">
          <p> Bonjour </p>
          <p className="text-orange"> Connected User </p>
        </div>
        <div className="flex">
          <div className="relative">
            <Image
              src="/assets/user.jpg"
              alt="image profile"
              className="user-profile"
              width={50}
              height={50}
            />
            <Image
              src="/assets/trophy.png"
              alt="image profile"
              className="image-profile"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div> */}
      <Header />
      <div>
        <div>Profile settings</div>
        <div>Profile settings</div>
        <div>Profile settings</div>
        <div>Profile settings</div>
      </div>
    </div>
  )
}

export default Profile
