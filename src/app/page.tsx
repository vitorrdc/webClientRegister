'use client'
import { ClientItem } from "@/components/ClientItem"
import { useEffect, useState } from "react"
import clsx from 'clsx';
import { SelectClientType } from "@/components/SelectClientType";
import axios from "axios";
import {useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask';

interface ClientsObject {
  id: number
  name: string
  adress: string
}

const registerNewClientFormSchema = z.object({
  name: z.string()
    .nonempty('O Nome é obrigatório.')
    .min(3, 'Por favor, considerar mínimo 3 caracteres')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  rg: z.string()
    .nonempty('Digite um RG válido')
    .refine((val) => /^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(val), {
      message: 'RG inválido. Use o formato xx.xxx.xxx-x',}), 
  cpf: z.string()
    .nonempty('Digite um CPF válido')
    .refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
      message: 'CPF inválido. Use o formato xxx.xxx.xxx-xx'
    }),    
  email: z.string()
    .nonempty('O E-mail é obrigatório ')
    .email('Formato de e-mail inválido')
    .toLowerCase()
})

type CreateClientFormData = z.infer<typeof registerNewClientFormSchema >

export default function Home() {

const { 
  register, 
  handleSubmit, 
  formState: {errors}  
  } = useForm<CreateClientFormData>({
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
      <aside className="w-1/3 h-screen border border-black overflow-y-scroll flex flex-col items-center px-2 py-4">
        <div className="font-semibold text-2xl text-gray-600 mb-8">Meus Clientes</div>   
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
        <div className="font-semibold text-2xl text-gray-600 mb-8">Cadastrar Novo Cliente</div>
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
            className="flex flex-col gap-4 mt-12 w-full"
            onSubmit={handleSubmit(handleFormData)}
          >
            <div className="flex flex-row items-center justify-around gap-1 w-full">
              <div className="flex flex-col justify-center w-full mr-4">
                <label htmlFor="name" className="text-gray-600 text-sm font-semibold ml-2">Nome</label>
                <input 
                  type="text" 
                  className=" w-full border-cyan-500 border bg-white rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm focus:border-cyan-700"
                  {...register('name')}  
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col justify-center w-1/2 mr-4">
                <label htmlFor="rg" className="text-gray-600 text-sm font-semibold ml-2">RG</label>
                <InputMask
                  mask='99.999.999-9'
                  className="w-full border-cyan-500 border bg-white rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm"
                  {...register('rg')}  
                />
                {errors.rg && <span className="text-red-500 text-xs">{errors.rg.message}</span>}
              </div>
              <div className="flex flex-col justify-center w-1/2 mr-4">
                <label htmlFor="cpf" className="text-gray-600 text-sm font-semibold ml-2">CPF</label>
                <InputMask
                  mask='999.999.999-99'
                  className="w-full border-cyan-500 border bg-white rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm"
                  {...register('cpf')}  
                />
                {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf.message}</span>}
              </div>
            </div>
            <div className="w-full flex flex-row justify-start items-center">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email" className="text-zinc-700 text-sm font-semibold ml-2">E-mail</label>
                <input 
                  type="text" 
                  className=" w-1/3 border border-cyan-500 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                  {...register('email')} 
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
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
