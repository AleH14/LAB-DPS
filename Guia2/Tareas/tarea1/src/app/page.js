import Image from "next/image";
import styles from "./page.module.css";
import Contador from "@/components/contador"

export default function Home() {
  return (
    <div className={styles.page}>
      <Contador />
    </div>
  );
}
