import React, { useEffect, useState,  } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner';
import "./Estilos/app.css";

function App() {
  const [res, setRes] = useState({});
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setRes({ estado: 'Descargando...' });

      const response = await fetch("https://get-ytb-theta.vercel.app/formdata", {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        setRes(responseData); // Actualiza el estado con la respuesta del servidor
        console.log("Datos enviados correctamente");
      } else {
        console.error("Error al enviar los datos");
        setRes({estado: "Error al intentar descargar"})
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return ( 
    <div>
      <h1 id="logo">getYtb()</h1>
      <div id="lienzo">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div>
          <h1>Introduce un enlace de YouTube</h1>
          <p><input type="text" id="entrada" {...register("textInput", {required: true})} /></p>

          {
            errors.textInput && <p style={{color: 'red', fontWeight: 'bold'}}>Debe colocar un enlace de YouTube en este campo</p>
          }
          </div>

          <input type="submit" id="boton" value="Descargar mp3"/>
        </form>
      <br/>
        <div id='estado'>
            {res.estado && <p>{res.estado}</p>}
        </div>
        
      </div>
      <h3 id="firma">creado por: Daniel Saldaña Guillot</h3>
    </div>
  );
}

export default App;
