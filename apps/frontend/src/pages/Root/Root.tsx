import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@store/hooks';
import { selectTimerType } from '@store/slices/timerTypeSlice';
import classes from './Root.module.scss'

export default function RootScreen() {
  const { timerType } = useAppSelector(selectTimerType);
  return (
    <div className={`${classes['root-container']} ${classes[`root-container__${timerType}`]}`}>
      <Outlet/>
    </div>  
  )
}
