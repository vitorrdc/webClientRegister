
export function ClientInfo({data}) {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className=" font-semibold text-2xl text-gray-600 mb-8">Visualizar Informações</div>
        <div className="bg-white rounded-lg w-2/3 h-auto flex flex-col p-4">
          <div className="flex flex-row justify-between">
            <div className="bg-blue-200 rounded-md h-8 text-base text-gray-600 px-2 py-1">{data.name}</div>
          </div>
        </div>
    </div>
  )
}