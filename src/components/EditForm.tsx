import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import InputMask from 'react-input-mask';

export const registerNewClientFormSchema = z.object({
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
      message: 'Use o formato xx.xxx.xxx-x',}), 
  cpf: z.string()
    .nonempty('Digite um CPF válido')
    .refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
      message: 'Use o formato xxx.xxx.xxx-xx'
    }),    
  email: z.string()
    .nonempty('O E-mail é obrigatório ')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  cep: z.string()
    .nonempty('O CEP é obrigatório')
    .refine((val) => /^\d{5}\-\d{3}$/.test(val), {
      message: 'Use o formato xxxxx-xxx'
    }),
  bairro: z.string()
    .nonempty('O Bairro é obrigatório'),
  rua: z.string()
    .nonempty('A Rua é obrigatório')
    .transform(adress => {
      return adress.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  number: z.string()
    .nonempty('Obrigatório')
    .refine(value => /^\d+$/.test(value), 'Número'),
  city: z.string()
    .nonempty('a Cidade é obrigatória')
    .transform(adress => {
      return adress.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  state: z.string()
    .nonempty('Obrigatório')
    .toUpperCase(),
  country: z.string()
    .nonempty('O País é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
})

export type CreateClientFormData = z.infer<typeof registerNewClientFormSchema >

interface EditFormProps {
  onSubmit: SubmitHandler<CreateClientFormData>
  clientData: CreateClientFormData
  valueOfSet: any
}

export function EditForm({onSubmit, clientData, valueOfSet}: EditFormProps) {

  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: {errors}  
    } = useForm<CreateClientFormData>({
    resolver: zodResolver(registerNewClientFormSchema)
  })

  return (
    <div className="flex flex-col items-center p-4 w-2/3 text-black">
      <form 
              className="flex flex-col gap-4 mt-12 w-full bg-white p-4 rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-gray-700 font-semibold">Informações do cliente</div>
              <div className="flex flex-row items-center justify-around gap-1 w-full">
                <div className="flex flex-col justify-center w-full mr-4">
                  <label htmlFor="name" className="text-gray-600 text-sm font-semibold ml-2">Nome</label>
                  <input 
                    type="text" 
                    className={clsx("w-full border-cyan-500 border bg-blue-100 rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm", {"border-red-500 border": errors.name})}
                    {...register('name')}
                    value={clientData.name}
                    onChange={(e) => valueOfSet({...clientData, name: e.target.value})}
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col justify-center w-1/2 mr-4">
                  <label htmlFor="rg" className="text-gray-600 text-sm font-semibold ml-2">RG</label>
                  <InputMask
                    mask='99.999.999-9'
                    className="w-full border-cyan-500 border bg-blue-100 rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm"
                    {...register('rg')}  
                    value={clientData.rg}
                    onChange={(e) => valueOfSet({...clientData, rg: e.target.value})}
                  />
                  {errors.rg && <span className="text-red-500 text-xs">{errors.rg.message}</span>}
                </div>
                <div className="flex flex-col justify-center w-1/2 mr-4">
                  <label htmlFor="cpf" className="text-gray-600 text-sm font-semibold ml-2">CPF</label>
                  <InputMask
                    mask='999.999.999-99'
                    className="w-full border-cyan-500 border bg-blue-100 rounded-md shadow-sm px-2 py-1 text-gray-700 text-sm"
                    {...register('cpf')}  
                    value={clientData.cpf}
                    onChange={(e) => valueOfSet({...clientData, cpf: e.target.value})}
                  />
                  {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf.message}</span>}
                </div>
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                <div className="flex flex-col w-1/2 mr-4">
                  <label htmlFor="email" className="text-zinc-700 text-sm font-semibold ml-2">E-mail</label>
                  <input 
                    type="text"  
                    className=" w-full border bg-blue-100 border-cyan-500 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                    {...register('email')} 
                    value={clientData.email}
                    onChange={(e) => valueOfSet({...clientData, email: e.target.value})}
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col w-1/6  mr-4">
                  <label htmlFor="cep" className="text-zinc-700 text-sm font-semibold ml-2">CEP</label>
                  <InputMask 
                    mask='99999-999' 
                    className="border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                    {...register('cep')} 
                    value={clientData.cep}
                    onChange={(e) => valueOfSet({...clientData, cep: e.target.value})}
                  />
                  {errors.cep && <span className="text-red-500 text-xs">{errors.cep.message}</span>}
                </div>
                <div className="flex flex-col mr-4 w-1/3">
                  <label htmlFor="bairro" className="text-zinc-700 text-sm font-semibold ml-2">Bairro</label>
                  <input 
                    type="text" 
                    className="border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                    {...register('bairro')} 
                    value={clientData.bairro}
                    onChange={(e) => valueOfSet({...clientData, bairro: e.target.value})}
                  />
                  {errors.bairro && <span className="text-red-500 text-xs">{errors.bairro.message}</span>}
                </div>
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                <div className="flex flex-col w-1/3 mr-4">
                  <label htmlFor="rua" className="text-zinc-700 text-sm font-semibold ml-2">Rua</label>
                  <input 
                    type="text" 
                    className=" w-full border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                      {...register('rua')} 
                      value={clientData.rua}
                      onChange={(e) => valueOfSet({...clientData, rua: e.target.value})}
                  />
                    {errors.rua && <span className="text-red-500 text-xs">{errors.rua.message}</span>}
                </div>
                <div className="flex flex-col mr-4 w-[5%]">
                  <label htmlFor="number" className="text-zinc-700 text-sm font-semibold ml-2">nº</label>
                  <input 
                    type="text" 
                    className=" w-full border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                      {...register('number')} 
                      value={clientData.number}
                      onChange={(e) => valueOfSet({...clientData, number: e.target.value})}
                  />
                    {errors.number && <span className="text-red-500 text-xs">{errors.number.message}</span>}
                </div>
                <div className="flex flex-col mr-4 w-1/4">
                  <label htmlFor="city" className="text-zinc-700 text-sm font-semibold ml-2">Cidade</label>
                  <input 
                    type="text" 
                    className=" w-full border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                      {...register('city')} 
                      value={clientData.city}
                      onChange={(e) => valueOfSet({...clientData, city: e.target.value})}
                  />
                    {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                </div>
                <div className="flex flex-col mr-4 w-[5%]">
                  <label htmlFor="state" className="text-zinc-700 text-sm font-semibold ml-2">UF</label>
                  <input 
                    type="text" 
                    className=" w-full border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                      {...register('state')} 
                      value={clientData.state}
                      onChange={(e) => valueOfSet({...clientData, state: e.target.value})}
                  />
                    {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
                </div>
                <div className="flex flex-col mr-4 w-1/4">
                  <label htmlFor="country" className="text-zinc-700 text-sm font-semibold ml-2">País</label>
                  <input 
                    type="text" 
                    className=" w-full border border-cyan-500 bg-blue-100 rounded-md px-2 py-1 text-gray-700 text-sm shadow-md"
                      {...register('country')} 
                      value={clientData.country}
                      onChange={(e) => valueOfSet({...clientData, country: e.target.value})}
                  />
                    {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
                </div>
              </div>
              <button 
                type="submit"
                className="bg-emerald-500 text-white rounded-md py-1 shadow-md mt-12"
              >
                Salvar alterações 
              </button>
            </form>
    </div>  
  )
}