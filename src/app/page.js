
import { authOptions } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const session= await getServerSession(authOptions)
  return (
    <main className={styles.main}>
      <p>main page</p>
      <p>{JSON.stringify(session)}</p>

         </main>
  );
}
