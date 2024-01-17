import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Formulary({setShowMen, setInfo}) {
    const [numero, setNumero] = useState("")
    const [mensaje, setMensaje] = useState("")

    async function submit(){
        setShowMen(true)
        setInfo({})
        const datForm = {
            numero: "+573238884307",
            mensaje: "Hola Felipe, recibimos tu solicitud para visitar Campuslands y sus instalaciones 🤩🚀, estaremos encantados de recibirte; te esperamos el 8/02/2024, no olvides traer tu documento original.🤩🚀"
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
      <Link to="https://wa.me/573238884307?v=2&text=Hola Felipe, recibimos tu solicitud para visitar Campuslands y sus instalaciones 🤩🚀, estaremos encantados de recibirte; te esperamos el 8/02/2024, no olvides traer tu documento original.🤩🚀">
        <button className='btn btn-success'>Aceptar</button>
      </Link>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default Formulary