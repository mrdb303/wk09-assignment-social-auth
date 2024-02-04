import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>The page does not exist</p>
      <Link href="/">Return to the homepage</Link>
    </div>
  );
}