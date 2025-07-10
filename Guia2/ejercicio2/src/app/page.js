import styles from "./page.module.css";
const Equipos = ({ equipos }) => {
  return (
    <div className={styles.container__list}>
      <h2 className={styles.title}>Equipos de Fútbol</h2>
      {equipos.map((equipo) => (
        <div key={equipo.id}>
          <h3 className={styles.nameclub}>{equipo.nombre}</h3>
          <ul >
            {equipo.plantilla.map((jugador) => (
              <li className={styles.container__list} key={jugador.id}>
                <strong>{jugador.nombre}</strong>
                <p>Altura: {jugador.Altura}m <br></br> Peso:
                  {jugador.Peso}Kg</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default function Home() {
  // Simula la obtención de datos desde tu JSON 
  const equiposData = [
  {
    "id": 1,
      "nombre": "Real Madrid",
        "plantilla": [
          { "id": 1, "nombre": "Eden Hazard", "Altura": "1.75", "Peso": "74Kg" },
          { "id": 2, "nombre": "GonzaloGarcía", "Altura": "1.82", "Peso": "74Kg" },
          { "id": 3, "nombre": "Karim Benzema", "Altura": "1.85", "Peso": "81Kg" }]
  },
  {
    "id": 2,
      "nombre": "Barcelona",
        "plantilla": [
          { "id": 1, "nombre": "Marc-André ter Stegen", "Altura": "1.75", "Peso": "74Kg" },
          { "id": 2, "nombre": "Iñigo Martinez", "Altura": "1.82", "Peso": "74Kg" },
          { "id": 3, "nombre": "Gavi", "Altura": "1.85", "Peso": "81Kg" }
        ]
  }];
  return (<main className={styles.main}>
    <div>
      <h1>Mi Aplicación de Fútbol</h1>
      <Equipos equipos={equiposData} />
    </div>
  </main>
  );
}