import React, { ReactNode, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { autenticarApi } from '../Api/authApi'

export default   function PriveteRouter({children}:{children:ReactNode}) {
    const [loading, setloading] = useState(true)
    const [autenticate, setautenticate] = useState(false)
    useEffect(()=>{
        let token = localStorage.getItem("token") || ""
        async function getAutenticate() {
            const r = await autenticarApi(token)  
            if (r === 200) {
                setautenticate(true)    
            }  
            setloading(false) 
        }
        getAutenticate()
    },[])

    if (loading) {
        return <div>autenticando...</div>
    } else {
        if (autenticate) {
            return <div>{children}</div>            
        } else {
            return <Navigate to={"/login"}/>
        }
    }
  }
