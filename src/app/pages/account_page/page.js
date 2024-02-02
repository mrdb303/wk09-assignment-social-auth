import { sql } from "@vercel/postgres";
import { auth, UserProfile } from "@clerk/nextjs";

export default async function AccountPage() {

  
  console.log(auth());
  const { userId } = auth();
  //const { email_address } = auth();

  const id = await sql`SELECT profile_id FROM sn_profiles WHERE clerk_user_id = ${userId}`;

  //console.log(id);
 // console.log(id.rows[0].profile_id);
  //console.log(email_address);
  

  return (
    <>
    <h2>Account Page</h2>
    <br/>
    <p>Your user account number is: {userId} <br/> {id.rows[0].profile_id}</p>
    
    </>
  );


}