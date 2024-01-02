import React from 'react'
import { DBleft, DBright } from '../components'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
        <DBleft/>
        <DBright/>
    </div>
  )
}

export default Dashboard