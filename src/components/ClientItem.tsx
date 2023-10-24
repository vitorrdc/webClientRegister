
interface Props {
  name: string
  adress: string
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  onClickInfo: (event: MouseEvent<HTMLDivElement>) => void;
}

export const ClientItem: React.FC<Props> = ({name, adress, onClick, onClickInfo}) => {

  return (
    <div className="grid grid-cols-3 w-full p-2 border-t border-gray- shadow-sm bg-white hover:bg-emerald-50 transition ">
        <button onClick={onClickInfo} className="text-gray-700 font-normal text-base">{name}</button>
        <button onClick={onClickInfo} className="text-gray-700 font-normal text-sm">{adress}</button>
        <button onClick={onClick} className="flex items-center justify-center">
          <img src="/image/delete.png" alt="" width={15} height={15}/>
        </button>
    </div>
  )
}