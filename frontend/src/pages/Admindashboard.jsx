import React from 'react'
import { COLORS, TEXT } from '../constants/styles';

export default function Admindashboard() {
  return (
    <div className={`text-black h-full flex flex-col p-8`}>
      <h1 className={`${TEXT["title"]}`}>Overview</h1>
    </div>
  )
}
