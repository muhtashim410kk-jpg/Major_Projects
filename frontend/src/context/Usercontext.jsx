import React, { createContext } from 'react'

 export  const userdatacontext = createContext()

function Usercontext({children}) {

 const serverUrl = "http://localhost:7000"

  const value ={
    serverUrl
  }

  return (
    <div>

      <userdatacontext.Provider value={value}>
      
      {children}

      </userdatacontext.Provider>
     


    </div>
  )
}

export default Usercontext
