import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";


export default function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      
      {/* <SignedIn>
        
        <UserButton />
      </SignedIn>
      <SignedOut>
        
        <SignInButton/>
      </SignedOut> */}


    </header>
  );
}