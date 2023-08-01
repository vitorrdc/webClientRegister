import { useDropzone } from 'react-dropzone';

export function InputAvatar({onFileSelected}) {

  const { getRootProps, getInputProps  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      onFileSelected(acceptedFiles[0])
    }
  })

  return (
    <div {...getRootProps()} className='dropzone bg-blue-400 p-2 rounded-lg mt-2'>
      <input {...getInputProps()} />
      <p className='text-gray-700'>Clique para selecionar uma imagem de Avatar ou arraste uma até aqui.</p>
    </div>
   
  )
}