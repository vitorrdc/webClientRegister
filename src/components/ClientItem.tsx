
interface Props {
  name: string
  adress: string
}

export const ClientItem: React.FC<Props> = ({name, adress}) => {
  return (
    <div className="grid grid-cols-2 w-full rounded-md p-2 mb-2 border shadow-sm shadow-cyan-200 border-cyan-600">
        <button className="text-gray-700 font-semibold text-base">{name}</button>
        <button className="text-gray-700 font-medium text-sm">{adress}</button>
    </div>
  )
}