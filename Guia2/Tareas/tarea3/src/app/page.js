import Image from "next/image";
import styles from "./page.module.css";
import Title from "@/components/Title";
import Login from "@/components/Login";

export default function Home() {
  return (
    <div className={styles.page}>
      <Title text="Welcome to My Page"/>
      <p>Usuario:Admin Contraseña: 123</p>
      <Login />

      
    
      
    </div>
  );
}
