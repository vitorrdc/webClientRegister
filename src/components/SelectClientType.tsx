import { MouseEventHandler } from "react"

interface Props {
  onClick: MouseEventHandler
  classStyle: string
  text: string
}

export const SelectClientType: React.FC<Props> = ({onClick, classStyle, text}) => {
  return (
      <button onClick={onClick} className={classStyle}>{text}</button>
  )
}