import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import axios from 'axios'

export default function MyDropzone() {

    const url = "http://localhost:3000"

    const [selectedFile, setSelectedFile] = useState('')
    const [values, setValues] = useState(selectedFile);
    const [visualize, setVisualize] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)

        setSelectedFile(fileUrl)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    //const img = JSON.parse(localStorage.getItem("img"))

    const VerImagem = () => {
        localStorage.setItem("img", selectedFile)
        const img = localStorage.getItem("img")
        setValues(img)
        return (
            <img src={img} alt="Esperando a imagem" className="col-6" />
        )
    }

    useEffect(() => {
        (async () => {
            const req = await axios.get(url)
            //console.log(req.data)
            setVisualize(req.data)
        })()
    }, [])

    const onChange = (ev) => {
        const { name, value } = ev.target;

        setValues({ ...values, [name]: value });
    };

    function onSubmit(ev) {

        ev.preventDefault();

        setTimeout(() => {
            //console.log({values})

            const mescla = selectedFile.slice(5, 500)

            axios.post(url, { "imagem": mescla })
                .then(() => {
                    alert('Imagem Cadastrado com sucesso');
                })
                .catch((err) => {
                    alert(`Houve um erro ao cadastra a imagem, ${err}`);

                });
        }, 2000)
    }

    const mescla = selectedFile.slice(5, 500)
    console.log(mescla)

    return (
        <>
            <form onSubmit={onSubmit}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} name="name" onChange={onChange}
                    />

                    {selectedFile
                        ? <img
                            src={selectedFile}
                            alt="Houve um erro"
                            className="img"
                        />
                        : <p>
                            <FiUpload style={{ width: 160, color: 'green' }} />
                            <br />
                            Insira uma Imagem aqui!
                        </p>
                    }

                </div>
                <button className="btn btn-primary mt-2" onClick={VerImagem}>Enviar</button>
            </form>
            <div className="container mt-5 col-md-10">
                {
                    visualize.map(r => (
                        <div key={r._id} className="mt-2" >
                            <img src={r.imagem} alt="Erro ao rendeniza as imagens" className="col-12" />
                        </div>
                    ))
                }
            </div>
        </>
    )
}