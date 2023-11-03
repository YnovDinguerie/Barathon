// Popup.tsx
import React from 'react'
import Modal from 'react-modal'
import Image from 'next/image'

interface PopupProps {
  isOpen: boolean
  onRequestClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Popup"
      ariaHideApp={false} // Pour éviter une erreur de style
    >
      <Image
        src="../../../assets/popup.svg"
        alt="Image popup"
        width={400}
        height={400}
      />
      <p>Ceci est un easter egg</p>
      <button onClick={onRequestClose}>Fermer</button>
    </Modal>
  )
}

export default Popup
