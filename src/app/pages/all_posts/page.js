
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { sql } from "@vercel/postgres";


export default async function ListAllPosts(){

  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);
  }

  const { userId } = auth();

  const userLevel = await sql`SELECT sn_profiles.profile_id, sn_profiles.user_level FROM sn_profiles 
  WHERE sn_profiles.clerk_user_id = ${userId}`;

  const userStatus = userLevel.rows[0]['user_level'];
  const profileId = userLevel.rows[0]['profile_id'];


  const posts = await sql`SELECT sn_posts.post_id, sn_profiles.user_level, sn_profiles.username, sn_posts.post_date, sn_posts.post_title, sn_posts.post_content, sn_posts.post_profile_id, sn_profiles.profile_id  FROM sn_posts 
  INNER JOIN sn_profiles ON sn_profiles.profile_id = sn_posts.post_profile_id ORDER BY sn_posts.post_date DESC`;

  return (
    <>
    <h4>Comments posted: {posts.rowCount}</h4>
    {posts.rows.map((post) => {
          return (
            <div key={post.post_id} className="post">
              <p>{post.username} posted on: {convDate(post.post_date)}</p><br/>
              <p>Title: {post.post_title}</p><br/>
              <p>{post.post_content}</p><br/>
              <Link href={`/pages/fistbump/${post.post_id}`}><button>Fist Bump</button></Link>
              {/* Only allow delete if admin*/}
              {userStatus === 2 && 
                <button>Delete</button>
              }
              {/* Only allow edit if the post belongs to user*/}
              {post.post_profile_id === profileId && 
                <button>Edit</button>
              }
            </div>
          );
        })}
    
    </>
  );

}

