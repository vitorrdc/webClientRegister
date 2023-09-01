import axios from "axios"

interface Props {
  name: string
  adress: string
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  onClickInfo: (event: MouseEvent<HTMLDivElement>) => void;
}

export const ClientItem: React.FC<Props> = ({name, adress, onClick, onClickInfo}) => {

  return (
    <div className="grid grid-cols-3 w-full rounded-md p-2 mb-1 border border-gray-200 shadow-sm bg-white hover:bg-blue-100 transition ">
        <button onClick={onClickInfo} className="text-gray-700 font-medium text-base">{name}</button>
        <button onClick={onClickInfo} className="text-gray-700 font-medium text-sm">{adress}</button>
        <button onClick={onClick} className="flex items-center justify-center">
          <img src="/image/delete.png" alt="" width={20} height={20}/>
        </button>
    </div>
  )
}