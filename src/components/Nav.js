import Link from "next/link";
import { UserButton, SignInButton, SignOutButton} from "@clerk/nextjs";
export default function Nav(params){

  //console.log(params.loggedIn);

  

  return (
    <>
    <nav>
      {/* {(params.loggedIn) && <Link href="/">Log Out</Link>}
      {(!params.loggedIn) && <Link href="/pages/sign-in">Log In</Link>} */}
    {/* <SignInButton />
          <SignOutButton /> */}
          <UserButton />
          <Link href="/">Home</Link>
          <Link href="/pages/account_page">Account</Link>
          {/* <Link href="/posts/addpost">Add a Tip</Link>
          <Link href="/posts/categories">List Categories</Link> */}
        </nav>
    </>
  );
}
