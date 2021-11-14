import React from 'react'
import './style.css'

export default function Content({ children }) {
  return (
    <div className="content">
      <div className="content__item p-3 m-2 m-sm-3">
        {children}
      </div>
    </div>
  )
}