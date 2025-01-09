import React from 'react'
import TopNav from '../../components/TopNav'
import AgentTopNav from '../../components/AgentTopNav'
import Search from '../../components/Search'

const UserList = () => {
  return (
    <div>
        <AgentTopNav />
        <div className="px-[17px] mt-[12px] ">
        <Search />
        </div>
        
      
    </div>
  )
}

export default UserList