// Popup.tsx
import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import '../styles/Popup.scss'

interface PopupProps {
  isOpen: boolean
  onRequestClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose }) => {
  const gifUrl =
    'https://gifdb.com/images/high/colorful-easter-egg-roll-hb7ervh5hnj1q9wn.gif'

  return (
    <Modal
      className="container-popup"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Popup"
      ariaHideApp={false}
    >
      <div className="pop-up">
        <Image src={gifUrl} alt="" width={400} height={400} />
        <p>Ceci est un easter egg</p>
        <button onClick={onRequestClose}>Fermer</button>
      </div>
    </Modal>
  )
}

export default Popup
