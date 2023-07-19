'use client'
import { useState } from "react"

interface ClientsObject {
  id: number
  name: string
  adress: string
}


export default function Home() {

const [clients, setClients] = useState([
  {
    id: 1,
    name: 'Vitor Ribeiro',
    adress: 'Rua José Melaré'
  },
  {
    id: 2,
    name: 'José Fernando',
    adress: 'Rua Martins de Sá'
  },
  {
    id: 3,
    name: 'Lucas Módolo',
    adress: 'Rua Oscar Freire'
  },
] as ClientsObject[])  


  return (
    <main className="w-screen h-screen flex-row">
      <aside className="w-1/3 h-screen border border-black overflow-y-scroll flex flex-col items-center px-8 py-4">
        <div className="font-semibold text-2xl text-cyan-600 mb-8">Meus Clientes</div>   
        <div className="w-full h-64">
          {
            clients.map((element) => {
              return (
                <div className="grid grid-cols-2 w-full rounded-md p-2 mb-2 border shadow-sm shadow-cyan-200 border-cyan-600">
                  <button className="text-gray-700 font-semibold text-base">{element.name}</button>
                  <button className="text-gray-700 font-medium text-sm">{element.adress}</button>
                </div>
              )
            })
          }
        </div>
      </aside>
    </main>
  )
}
