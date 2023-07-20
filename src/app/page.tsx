'use client'
import { ClientItem } from "@/components/ClientItem"
import { useEffect, useState } from "react"
import clsx from 'clsx';
import { SelectClientType } from "@/components/SelectClientType";
import axios from "axios";

interface ClientsObject {
  id: number
  name: string
  adress: string
}


export default function Home() {

const [clientType, setClientType] = useState<string>('Pessoa Física')
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

  function handlePhysicalClient() {
    setClientType('Pessoa Física')
  }

  function handleLegalClient() {
    setClientType('Pessoa Jurídica')
  }

  async function fetchClients() {
    try {
      const response = await axios.get('http://localhost:3001/posts')
      const clients = response.data
      console.log(clients)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchClients()
  },[])

  return (
    <main className="w-screen h-screen flex flex-row">
      <aside className="w-1/3 h-screen border border-black overflow-y-scroll flex flex-col items-center px-8 py-4">
        <div className="font-semibold text-2xl text-cyan-600 mb-8">Meus Clientes</div>   
        <div className="w-full h-64">
          {
            clients.map((element) => {
              return (
                <ClientItem name={element.name} adress={element.adress} />
              )
            })
          }
        </div>
      </aside>
      <div className="flex flex-col items-center p-4 w-2/3">
        <div className="font-semibold text-2xl text-cyan-600 mb-8">Cadastrar Novo Cliente</div>
        <div className="flex flex-row justify-between">
          <SelectClientType 
            classStyle={clsx("w-36 py-2 text-center mr-4 text-gray-700", {"border-b-2 border-cyan-600 font-bold": clientType === 'Pessoa Física'})}
            text="Pessoa Física"
            onClick={handlePhysicalClient}
          />
           <SelectClientType 
            classStyle={clsx("w-36 py-2 text-center mr-4 text-gray-700", {"border-b-2 border-cyan-600 font-bold": clientType === 'Pessoa Jurídica'})}
            text="Pessoa Jurídica"
            onClick={handleLegalClient}
          />
        </div>
      </div>
    </main>
  )
}
