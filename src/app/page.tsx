'use client'
import { ClientItem } from "@/components/ClientItem"
import { useEffect, useState } from "react"
import { SelectClientType } from "@/components/SelectClientType";
import axios from "axios";
import { InputAvatar } from "@/components/InputAvatar";
import { EmpityClientList } from "@/components/EmpityClientList";
import { CreateClientFormData, Form, registerNewClientFormSchema } from "@/components/Form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientInfo } from "@/components/ClientInfo";
import { EditForm } from "@/components/EditForm";

interface ClientsObject {
  id: number
  name: string
  rg: string
  cpf: string
  email: string
  cep: string
  bairro: string
  rua: string
  number: string
  city: string
  country: string
  state: string
}

export default function Home() {

const [selectedImage, setSelectedImage] = useState(null);
const [clientData, setClientData] = useState<any>('')
const [newClientList, setNewClientList] = useState<ClientsObject>('')
const [clientInfo, setClientInfo] = useState<any>('')

const { reset, setValue, control } = useForm<CreateClientFormData>({
  resolver: zodResolver(registerNewClientFormSchema)
})

  async function fetchClients() {
    try {
      const response = await axios.get('http://localhost:3001/posts')
      const clients = response.data
      setClientData(clients)
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    fetchClients()
  },[newClientList])

  async function handleFormData(data: any) {
   const form = data
   try {
    const response = await axios.post('http://localhost:3001/posts', form )
    const newClient = response.data
    setNewClientList(newClient)
    reset()
  } catch (error) {
    console.log(error)
   } 
  }

  async function handleDeleteClient(id) {
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`)
      const updateList = clientData.filter((element) => element.id !== id)
      setClientData(updateList)
    } catch (error) {
      window.alert(error)
    }
  }
  
  async function handleClientInfo(id) {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${id}`)
      setClientInfo(response.data)
    } catch (error) {
      window.alert(error)
    }
  } 

  useEffect(() => {
    if (clientInfo) {
      setValue('name', clientInfo.name);
      setValue('rg', clientInfo.rg);
      setValue('cpf', clientInfo.cpf);
      setValue('email', clientInfo.email);
      setValue('cep', clientInfo.cep);
      setValue('bairro', clientInfo.bairro);
      setValue('rua', clientInfo.rua);
      setValue('number', clientInfo.number);
      setValue('city', clientInfo.city);
      setValue('state', clientInfo.state);
      setValue('country', clientInfo.country);
    }
  }, [clientInfo]);

  console.log(clientInfo)

  return (
    <main className="w-screen h-screen flex flex-row">
      <aside className=" bg-white w-1/3 h-screen border border-black overflow-y-scroll flex flex-col items-center px-2 py-4">
        <div className="font-semibold text-2xl text-gray-600 mb-8">Meus Clientes</div>   
        <div className="w-full h-64">
          {
           clientData && clientData.map((element) => {
              return (
                <ClientItem key={element.id} name={element.name} adress={element.rua} onClick={() => handleDeleteClient(element.id)} onClickInfo={() => handleClientInfo(element.id)} />
              )
            })
          }
          {
            clientData.length === 0 && <EmpityClientList />
          }
        </div>
      </aside>
      <div className="flex flex-col items-center p-4 w-2/3 text-black">
        {/* <div className="font-semibold text-2xl text-gray-600 mb-8">Cadastrar Novo Cliente</div> */}
        {/* <Form onSubmit={handleFormData} />            */}
        {/* <Controller
          name="name"
          control={control}
          render={({ field }) => <input type="text" {...field} />}
        /> */}
        <EditForm clientData={clientInfo} onSubmit={handleFormData} />
      </div>
    </main>
  )
}
