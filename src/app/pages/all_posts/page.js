
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { sql } from "@vercel/postgres";


export default async function ListAllPosts(){

  // Make the timestamp value easier to read:
  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);
  }

  const { userId } = auth();

  const userLevel = await sql`SELECT sn_profiles.profile_id, sn_profiles.user_level FROM sn_profiles 
  WHERE sn_profiles.clerk_user_id = ${userId}`;

  const userStatus = userLevel.rows[0]['user_level'];
  const profileId = userLevel.rows[0]['profile_id'];


  // This COUNTs the number of posts held in the postlikes table for each record
  // and produces the number of records/fist bumps. This is carried out in 
  // conjunction with a GROUP BY statement to produce totals and a poster's 
  // username. Carried out with an ORDER BY statement to ensure the posts are 
  // returned in order of latest first. Note that a LEFT JOIN is also used to 
  // ensure that even when there are no records joined between two of the 
  // tables, a value of 0 is returned when counted.

  /*
  const posts = await sql`SELECT sn_posts.post_profile_id, sn_posts.post_clerk_id, sn_posts.post_id, sn_posts.post_title, sn_posts.post_content,sn_posts.post_date 
  FROM sn_posts
  LEFT JOIN sn_postlikes ON sn_posts.post_profile_id = sn_postlikes.postlike_profile_id
  INNER JOIN sn_profiles ON sn_profiles.profile_id = sn_posts.post_profile_id
  GROUP BY(sn_posts.post_id)
  ORDER BY sn_posts.post_id`;
*/

const posts = await sql`SELECT sn_posts.post_id, sn_posts.post_title, sn_posts.post_content, sn_posts.post_clerk_id,  sn_posts.post_date, sn_profiles.username,
    COALESCE(SUM(sn_postlikes.postlike_val),0) AS bumpcount
    FROM sn_posts
    LEFT JOIN sn_postlikes ON sn_posts.post_id = sn_postlikes.post_id
    JOIN sn_profiles ON sn_posts.post_clerk_id = sn_profiles.clerk_user_id
    GROUP BY sn_posts.post_id, sn_profiles.username
    ORDER BY bumpcount DESC, sn_posts.post_id`;

//console.log(posts);


 /*   const posts = await sql`SELECT sn_posts.post_id, sn_posts.post_title, sn_posts.post_content,sn_posts.post_clerk_id, sn_profiles.username ,sn_posts.post_date, 
    sn_posts.post_profile_id, COUNT(sn_postlikes.post_id) AS bumpcount
    FROM sn_posts
    INNER JOIN sn_profiles ON sn_posts.post_clerk_id = sn_profiles.clerk_user_id
    LEFT JOIN sn_postlikes ON sn_posts.post_clerk_id = sn_postlikes.postlike_clerk_id
    GROUP BY(sn_posts.post_id, sn_profiles.username)
    ORDER BY sn_posts.post_id DESC`;
*/


  return (
    <>
    <h4>Comments posted: {posts.rowCount}</h4>
    {posts.rows.map((post) => {
          return (
            <div key={post.post_id} className="post">
              <p>{post.username} Posted on: {convDate(post.post_date)}</p><br/>
              <p>Title: {post.post_title}</p><br/>
              <p>{post.post_content}</p><br/>
              <p>Fist Bumps: {post.bumpcount}</p><br/>
              <Link href={`/pages/fistbump/${post.post_id}`}><button>Fist Bump</button></Link>
              <Link href={`/pages/user/${post.post_profile_id}`}><button>Profile</button></Link>
              {/* Only enable delete button if user status = admin*/}
              {userStatus === 2 && 
                <button>Delete</button>
              }
              {/* Only enable edit button if the post belongs to the logged in user*/}
              {post.post_profile_id === profileId && 
                <button>Edit</button>
              }
            </div>
          );
        })}
    
    </>
  );

}

