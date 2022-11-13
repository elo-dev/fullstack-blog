import { RefObject, useEffect, useState } from 'react'

const useClickOutside = <T extends HTMLElement>(rootEl: RefObject<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) return

    const onClick = (e: MouseEvent) => {
      if (!rootEl.current) return
      if (!rootEl.current.contains(e.target as Node)) {
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
