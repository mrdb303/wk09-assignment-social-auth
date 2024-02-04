import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";





export default async function FistBump({params}){
  "use server";

  const { userId } = auth();

  // get user id from database
  const id = await sql`SELECT profile_id FROM sn_profiles WHERE clerk_user_id = ${userId}`;
  // 

  // Check the database to see if the user has liked the post already.
  const likeData = await sql`SELECT sn_posts.post_clerk_id, sn_postlikes.postlike_clerk_id FROM sn_posts
  INNER JOIN sn_postlikes
  ON sn_postlikes.postlike_clerk_id = ${userId}
  WHERE sn_postlikes.postlike_id = ${params.fistbump}`;

  console.log(params);

  // Write the fistbump/like into the sn_postlikes table if the user hasn't
  // recorded one against this record.
  if(likeData.rowCount === 0) {
    const writeLike = await sql`INSERT INTO sn_postlikes (postlike_profile_id, postlike_clerk_id, post_id) VALUES (${id.rows[0].profile_id},${userId}, ${Number(params.fistbump)})`;
  }
  
  revalidatePath("/");
  redirect("/");



  return (
    <div><p>Registering Fist Bump for record {params.fistbump}</p></div>
    );
}