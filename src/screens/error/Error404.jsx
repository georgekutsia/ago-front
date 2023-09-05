import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className='error404'>
    <h2>¿Cómo llegaste aqui?</h2>
    <img src="https://res.cloudinary.com/dfrda73uc/image/upload/v1687523229/donGions%20imgs/WhatsApp-Video-2023-06-23-at-13.17.33_wjpe6x.gif" alt="error404" />
    <p>Ir a la  <Link to="/">Página principal</Link></p>
    </div>
  )
}

export default Error404