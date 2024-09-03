import LandingBanner from "@/components/homepage/LandingBanner";
import { authOptions } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import LandingCard from "@/components/homepage/LandingCard";
import LandingLocation from "@/components/homepage/LandingLocation";
import LandingTypeshow from "@/components/homepage/LandingTypeshow";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <LandingBanner />
      <p>{JSON.stringify(session.user.email)}</p>
      <LandingCard />
      <LandingLocation />
      <LandingTypeshow/>
  
      
    </>
  );
}
