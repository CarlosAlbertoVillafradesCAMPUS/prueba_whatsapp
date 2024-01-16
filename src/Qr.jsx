import React, { useEffect } from 'react'

function Qr({urlQR, setShowForm, setShow}) {
    const handleSHowForm = async()=>{
        let options = {
            method: "GET",
            headers: new Headers({"Content-Type": "application/json"}),
          }
          try {
            const response = await (await fetch(`http://127.17.0.98:5017/prueba`, options)).json();
            if(response.status === 200){
                if (response.message) {
                    setShow(false)
                    setShowForm(true)  
                }else{
                    setShow(false)
                }
            } else{
              alert(response.message)
            }
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <>
     {
              urlQR ?(
                <div className='w-100'>
                    <div className='w-100 d-flex justify-center'>
                        <button onClick={handleSHowForm} className='btn-danger fs-1 text-center font-bold' type='button'>X</button>
                    </div>
                    <div className='w-100 d-flex justify-center'>
                        <img src={urlQR} />
                    </div>
                </div>
                ):(
                  <p>No se a podido Gnerar qr</p>
                )
            }
    </>
  )
}

export default Qr;