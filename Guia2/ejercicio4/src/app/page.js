"use client";
import { useState } from "react"; import styles from "./page.module.css";

export default function Home() {
  const [numero, setNumero] = useState(1);
  const [limite, setLimite] =useState(10); 
  const [resultado, setResultado] = useState([]);
  const generarTabla = () => {
    const nuevaTabla = []; 
    for (let i = 1; i <= limite; i++) {
      nuevaTabla.push(`${numero} x ${i} = ${numero * i}`);
    }
    setResultado(nuevaTabla);
  };
  return (
    <main className={styles.main}>
      <div>
        <h2 className={styles.title2}>Tabla de Multiplicar</h2> <label className={styles.text}>
          Ingrese un número:
          <input className={styles.input} type="number" value={numero}
            onChange={(e) => setNumero(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label className={styles.text}>
          Límite de números a mostrar: <input
            className={styles.input} type="number" value={limite}
            onChange={(e) => setLimite(parseInt(e.target.value))} />
        </label>
        <br />
        <button className={styles.button} onClick={generarTabla}>Generar
          Tabla</button>
        <hr />
        <h3>Resultado</h3>
        <ul className={styles.ul}>
          {resultado.map((item, index) => (
            <li className={styles.li} key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}