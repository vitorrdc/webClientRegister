import { useDropzone } from 'react-dropzone';

export function InputAvatar({onFileSelected}) {

  const { getRootProps, getInputProps  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      onFileSelected(acceptedFiles[0])
    }
  })

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
    </div>
   
  )
}