import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import Header from "@/components/Header";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  
  const { userId } = auth();
  
  // go and get the user profile from our db
  const profileRes = await sql`SELECT * FROM sn_profiles WHERE clerk_user_id = ${userId}`;

  console.log({userId});
  console.log(profileRes);
  console.log(profileRes.rowCount);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header/>
          <UserButton afterSignOutUrl="/" />
          <h1>Social Profile</h1>
          {/* if the user has a profile, carry on as normal */}
          {profileRes.rowCount !== 0 && children}

          {/* if the user DOESN'T has a profile, show the CreateProfile component */}
          {profileRes.rowCount === 0 && <CreateProfile />}
        </body>
      </html>
    </ClerkProvider>
  );
}
