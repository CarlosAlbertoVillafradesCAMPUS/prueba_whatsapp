import React, { useState } from 'react'

function Formulary({setShowMen, setInfo}) {
    const [numero, setNumero] = useState("")
    const [mensaje, setMensaje] = useState("")

    async function submit(e){
        e.preventDefault()
        setShowMen(true)
        setInfo({})
        const datForm = {
            numero: "+57" + numero,
            mensaje: mensaje
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
        <form onSubmit={submit}>
            <h1 className='text-success mt-5'>SESION INCIADA</h1>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Numero</label>
            <input type='text' onChange={(e)=>setNumero(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Mensaje</label>
            <input type="text" onChange={(e)=>setMensaje(e.target.value)} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Enviar mensaje</button>
        </form>
    </div>
  )
}

export default Formulary