import { useState } from 'react'
export default function Hamburgers() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className={`c-hamburger c-hamburger--magnetic ${open ? `active` : ``}`} onClick={() => setOpen(!open)}>
        <div className="c-hamburger-inner">
          <span className="c-hamburger-bar"></span>
          <span className="c-hamburger-bar"></span>
          <span className="c-hamburger-bar"></span>
        </div>
      </div>
    </div>
  )
}
