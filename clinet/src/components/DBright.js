import React from 'react'
import Dbheader from './Dbheader'
import { Route, Routes } from 'react-router-dom'
import DBhome from './DBhome'
import DBorders from './DBorders'
import DBitems from './DBitems'
import DBnewitem from './DBnewitem'
import DBuser from './DBuser'

function DBright() {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
      <Dbheader/> 
      <div className='flex flex-col flex-1 overflow-y-scroll  scrollbar-none' >
        <Routes>
          <Route path='/home' element={<DBhome/>}/>
          <Route path='/oders' element={<DBorders/>}/>
          <Route path='/items' element={<DBitems/>}/>
          <Route path='/new-items' element={<DBnewitem/>}/>
          <Route path='/users' element={<DBuser/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default DBright