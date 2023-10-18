'use client'
import { useEffect, useState } from "react"
import axios from "axios";
import { CreateClientFormData, Form, registerNewClientFormSchema } from "@/components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditForm } from "@/components/EditForm";
import { AsideClientList } from "@/components/AsideList";

export interface ClientsObject {
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

const [clientData, setClientData] = useState<any>('')
const [newClientList, setNewClientList] = useState<ClientsObject>()
const [clientInfo, setClientInfo] = useState<any>('')
const [openNewClientForm, setOpenNewClientForm] = useState<boolean>(true)
const [openEditClientForm, setOpenEditClientForm] = useState<boolean>(true)
const [shouldFetchClients, setShouldFetchClients] = useState(true);

const { reset, setValue} = useForm<CreateClientFormData>({
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
    if (shouldFetchClients) {
      fetchClients();
      setShouldFetchClients(false); // Evite futuras chamadas desnecessárias
    }
  },[shouldFetchClients])

  async function handleFormData(data: ClientsObject) {
    const form = data
    try {
     const response = await axios.post('http://localhost:3001/posts', form )
     const newClient = response.data
     setNewClientList(newClient)
     setClientData([...clientData, newClient])
   } catch (error) {
     console.log(error)
    } 
   }

  async function handleDeleteClient(id: number) {
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`)
      const updateList = clientData.filter((element: ClientsObject) => element.id !== id)
      setClientData(updateList)
    } catch (error) {
      window.alert(error)
    }
  }
  
  async function handleClientInfo(id: number) {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${id}`)
      setClientInfo(response.data)
    } catch (error) {
      window.alert(error)
    }
    setOpenNewClientForm(false)
  } 

  async function handleUpdateData(id: number) {
    try {
      const response = await axios.put(`http://localhost:3001/posts/${id}`, clientInfo)
      const updateClientData = clientData.map((client: ClientsObject) => {
        if (client.id === id) {
          return {
            ...client,
            clientInfo
          }
        } else {
          return client
        }
      })
      setClientData(updateClientData)
      setShouldFetchClients(true) // Permite buscar clientes novamente
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

  function handleOpenNewClientWindow() {
    setOpenNewClientForm(true)
  }

  function handleOpenEditClientWindow() {
    setOpenNewClientForm(false)
    setOpenEditClientForm(true)
  }

console.log()
  return (
    <main className="w-screen h-screen flex flex-row">
      <AsideClientList clientData={clientData} handleClientInfo={handleClientInfo} handleDeleteClient={handleDeleteClient} handleOpenNewClientWindow={handleOpenNewClientWindow}  />
        {
          openNewClientForm ? <Form onSubmit={handleFormData} /> : <EditForm clientData={clientInfo} onSubmit={() => handleUpdateData(clientInfo.id)} valueOfSet={setClientInfo} />
        }         
    </main>
  )
}
