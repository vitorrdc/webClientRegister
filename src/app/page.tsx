'use client'
import { ClientItem } from "@/components/ClientItem"
import { useEffect, useState } from "react"
import clsx from 'clsx';
import { SelectClientType } from "@/components/SelectClientType";
import axios from "axios";
import {useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface ClientsObject {
  id: number
  name: string
  adress: string
}

const registerNewClientFormSchema = z.object({
  name: z.string()
    .nonempty('O Nome é obrigatório.')
    .min(3, 'Por favor, considerar mínimo 3 caracteres'),
  email: z.string()
    .nonempty('O E-mail é obrigatório ')
    .email('Formato de e-mail inválido')
})


export default function Home() {

const { 
  register, 
  handleSubmit, 
  formState: {errors}  
  } = useForm({
  resolver: zodResolver(registerNewClientFormSchema)
})

console.log(errors)

const [outPut, setOutPut] = useState<any>('')
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

  function handleFormData(data: any) {
    setOutPut(JSON.stringify(data, null, 2))
  }

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
          <form 
            className="flex flex-col gap-4 mt-12"
            onSubmit={handleSubmit(handleFormData)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 text-sm ml-2">Nome</label>
              <input 
                type="text" 
                className=" border border-gray-500 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                {...register('name')}  
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-zinc-700 text-sm ml-2">E-mail</label>
              <input 
                type="text" 
                className=" border border-gray-500 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                {...register('email')} 
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <button 
              type="submit"
              className="bg-emerald-500 text-white rounded-md py-1 shadow-md"
            >
              Salvar
            </button>
          </form>
          <pre className="text-gray-700">{outPut}</pre>
      </div>
    </main>
  )
}
