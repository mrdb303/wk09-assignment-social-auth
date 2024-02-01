import { UserButton } from "@clerk/nextjs";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className="h-screen">
      {/* <UserButton afterSignOutUrl="/"/> */}
      <p>Home page</p>
    </div>
  );
}
