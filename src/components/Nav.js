import Link from "next/link";
import { sql } from "@vercel/postgres";
import { UserButton, SignInButton, SignOutButton, auth} from "@clerk/nextjs";

export default async function Nav(){

  //console.log(params.loggedIn);
  const { userId } = auth();

  // Menu needs a check to see if you have a profile!!!!!!
  const profileInfo = await sql`SELECT * FROM sn_profiles WHERE clerk_user_id = ${userId}`;
  const profileId = profileInfo.rows[0]['profile_id'];

  return (
    <>
    <nav>
      {/* {(params.loggedIn) && <Link href="/">Log Out</Link>}
      {(!params.loggedIn) && <Link href="/pages/sign-in">Log In</Link>} */}
    {/* <SignInButton />
          <SignOutButton /> */}
          <UserButton />
          <Link href="/">Home</Link>
          {profileInfo.rowCount !== 0 &&
            <Link href="/pages/user/[userid]" as={`/pages/user/${profileId}`}>Timeline</Link>}
          {profileInfo.rowCount !== 0 && 
            <Link href="/pages/all_posts">Show All Posts</Link>}
        </nav>
    </>
  );
}


