import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Formulary({setShowMen,setInfo}) {
    const [numero, setNumero] = useState("")
    const [mensaje, setMensaje] = useState("")

    async function submit(){
        setInfo({})
        setShowMen(true)
        const datForm = {
            numero: "+573238884307",
            mensaje: "Hola Carlos, recibimos tu solicitud para visitar Campuslands y sus instalaciones 🤩🚀, estaremos encantados de recibirte; te esperamos el 12/02/2024, no olvides traer tu documento original.🤩🚀"
        }
        let options = {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(datForm)
          }
          try {
            const response = await (await fetch(`http://127.17.0.98:5017/message`, options)).json();
            if(response.status === 200){
                setInfo(response)
            } else{
              alert(response.message)
            }
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <div className='w-100 d-flex justify-content-center'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Numero</th>
      <th scope="col">Empresa</th>
      <th scope="col">Fecha</th>
      <th scope="col">Accept</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Carlos</td>
      <td>3238884307</td>
      <td>Campuslands</td>
      <td>12/02/2024</td>
      <td>
      <button onClick={()=>submit()} className='btn btn-success'>Aceptar</button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Felipe</td>
      <td>3238884307</td>
      <td>Campuslands</td>
      <td>8/02/2024</td>
      <td>
      <a href="https://api.whatsapp.com/send?phone=573238884307&text=Hola%20Felipe,%20recibimos%20tu%20solicitud%20para%20visitar%20Campuslands%20y%20sus%20instalaciones%20%F0%9F%A4%A9%F0%9F%9A%80,%20estaremos%20encantados%20de%20recibirte;%20te%20esperamos%20el%208%2F02%2F2024,%20no%20olvides%20traer%20tu%20documento%20original.%F0%9F%A4%A9%F0%9F%9A%80" target="_blank">
        <button className='btn btn-success'>Aceptar</button>
    </a>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default Formulary