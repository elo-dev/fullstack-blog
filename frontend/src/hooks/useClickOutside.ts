import { useEffect, useState } from 'react'

const useClickOutside = (rootEl) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) return

    const onClick = (e) => {
      if (!rootEl.current) return
      if (!rootEl.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', onClick)
    return () => removeEventListener('click', onClick)
  }, [isOpen])

  return {
    isOpen,
    setIsOpen,
  }
}

export default useClickOutside
