import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Disclaimer from "@/components/Disclaimer";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fist Bump - The Pound Shop Social Media Site",
  description: "Assignment 09",
};

export default async function RootLayout({ children }) {
  
  const { userId } = auth();
  
  // go and get the user profile from our db
  const profileRes = await sql`SELECT * FROM sn_profiles WHERE clerk_user_id = ${userId}`;

  let loggedIn = false;
  if(profileRes.rowCount !== 0) loggedIn = true;

  //console.log({userId},' -User id');
  //console.log(profileRes.clerk_user_id);
  //console.log(profileRes.rowCount);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          
          <Nav loggedIn={loggedIn} />
          <div id="wrapper">
            <div id="child-wrapper">
              {profileRes.rowCount !== 0 && children}
              {profileRes.rowCount === 0 && <CreateProfile />}
              <Disclaimer />
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}


