
export function ClientInfo({data}) {
  return (
    <div className="flex flex-col items-center p-4 w-2/3">
      <div className="font-semibold text-2xl text-gray-600 mb-8">Visualizar Informações</div>
        {
          data.map((element) => {
            return (
              <div key={element.id}>{element.name}</div>
            )
          })
        }
    </div>
  )
}