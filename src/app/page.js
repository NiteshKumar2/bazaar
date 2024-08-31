
import LandingBanner from "@/components/homepage/LandingBanner";
import { authOptions } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import LandingCard from "@/components/homepage/LandingCard";

export default async function Home() {
  
  const session= await getServerSession(authOptions)
  return (
    <>
  <LandingBanner/>
    <main className={styles.main}>
  <LandingCard/>
      <p>main page</p>
      <p>{JSON.stringify(session)}</p>

         </main>
         </>
  );
}
