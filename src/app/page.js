import { UserButton } from "@clerk/nextjs";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
}
