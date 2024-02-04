import { sql } from "@vercel/postgres";
import Link from "next/link";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";

export default async function UserPosts({params}){
  "use server"

  // Make the timestamp value easier to read:
  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);
  }

  const { userId } = auth();
  
  
  //const clerkCode = params.profileId;
  //console.log({ userId});
  //console.log({clerkCode});

  const userLevel = await sql`SELECT sn_profiles.profile_id, sn_profiles.user_level ,sn_profiles.clerk_user_id FROM sn_profiles 
  WHERE sn_profiles.clerk_user_id = ${params.profileId}`;

  const userStatus = userLevel.rows[0]['user_level'];
  const profileId = userLevel.rows[0]['profile_id'];

  let idSearchedFor = "";

  if(profileId === undefined) {
    idSearchedFor = userId;
  } else {
    idSearchedFor = userLevel.rows[0]['clerk_user_id'];;
  }

  console.log("Id searched for: ");
  console.log(idSearchedFor);
  //const idSearchedFor = params.clerkIdSearchedFor;
  //console.log({idSearchedFor});

  const posts = await sql`SELECT sn_posts.post_id, sn_posts.post_title, sn_posts.post_content,sn_posts.post_clerk_id ,sn_posts.post_date, 
    COUNT(postlike_profile_id) AS bumpcount
    FROM sn_posts
    INNER JOIN sn_profiles ON sn_profiles.clerk_user_id = sn_posts.post_clerk_id
    LEFT JOIN sn_postlikes ON sn_posts.post_clerk_id = sn_postlikes.postlike_clerk_id
    WHERE sn_profiles.clerk_user_id = ${idSearchedFor}
    GROUP BY(sn_posts.post_id)
    ORDER BY sn_posts.post_id DESC`;
// 
  //console.log(posts);

  return (
    <>
    <h3>Posts Owned: {posts.rowCount}</h3>
    {posts.rows.map((post) => {
          return (
            <div key={post.post_id} className="post">
              <p>{post.username} Posted on: {convDate(post.post_date)}</p><br/>
              <p>Title: {post.post_title}</p><br/>
              <p>{post.post_content}</p><br/>
              <p>Fist Bumps: {post.bumpcount}</p><br/>
              <Link href={`/pages/fistbump/${post.post_id}`}><button>Fist Bump</button></Link>
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


/*
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


*/