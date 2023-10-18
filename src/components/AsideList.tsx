import { ClientItem } from "./ClientItem"
import { EmpityClientList } from "./EmpityClientList"
import { ClientsObject } from "@/app/page"

interface AsideClientListProps {
  handleOpenNewClientWindow: () => void
  clientData: ClientsObject[]
  handleDeleteClient: (id: number) => void
  handleClientInfo: (id: number) => void
}

export function AsideClientList({handleOpenNewClientWindow, clientData, handleDeleteClient, handleClientInfo}: AsideClientListProps) {
  return (
    <aside className=" bg-white w-1/3 h-screen border border-black overflow-y-scroll flex flex-col    items-center px-2 py-4">
        <div className="font-semibold text-2xl text-gray-600 mb-2">Meus Clientes</div> 
        <div className="w-full flex justify-end mb-2">
          <button className="flex-end" onClick={handleOpenNewClientWindow}>
            <img src="/image/addClient.png" alt="" width={40} height={40}/>
          </button> 
        </div> 
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
  )
}