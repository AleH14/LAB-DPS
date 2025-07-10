"use client"
import React, {useState} from "react";

const contador =()=>{
    const [cont, setCont] = useState(0);
    
    return(
        <>
            <div>
                <h2>Contador: {cont}</h2>
                <button onClick={() => setCont(cont + 1)}>Incrementar</button>
                <button onClick={() => setCont(cont - 1)}>Decrementar</button>
                <button onClick={() => setCont(0)}>Resetear</button>
            </div>
        </>

    )
}

export default contador;