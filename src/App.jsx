import { useState } from 'react'
import Formulary from './Formulary'
import Qr from './Qr'
import "./style.css"

function App() {
  const [url, setUrl] = useState({})
  const [show, setShow] = useState(false)
  const [showMen, setShowMen] = useState(false)
  const [info, setInfo] = useState({})

  async function generateQR() {
    setShow(true)
    let options = {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    }
    try {
      const responseQR = await (await fetch(`http://127.17.0.98:5017/sesion`, options)).json();
      if (responseQR.status == 200) {
        setUrl(responseQR)
      }

      else {
        alert(responseQR.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='contai'>
        <div>
          <div>
            <h1>Generar codigo QR para whatsapp</h1>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={() => generateQR()} type="button" className="btn btn-primary">Generate QR</button>
          </div>
          {
            show && (
              url.message ? (
                <Qr setShowForm={setShowForm} setShow={setShow} urlQR={url.message.urlCode || false} />
              ) : (
                <p>Generando Codigo QR...</p>
              )
            )
          }
            <Formulary setShowMen={setShowMen} setInfo={setInfo} />
          {
            showMen && (
              info.message ? (
                <h2 className='text-center mt-4 text-success'>Mensaje Enviado</h2>
              ) : (
                <p>Enviando Mensaje...</p>
              )
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
