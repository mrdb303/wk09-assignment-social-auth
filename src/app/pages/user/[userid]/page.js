import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import UserPosts from "@/components/UserPosts"


export default async function TimeLine({params}){
  "use server";

  const { userId } = auth();

  // Make the timestamp value easier to read:
  function convDate(obj){
    let ukTimeVal = obj[0].toUTCString();
    return ukTimeVal.substr(5, 17);
  }


  // CHECK params - find the id num if not zero
  // display instead of user timeline

  const checkForUser = await sql`SELECT * FROM sn_profiles WHERE sn_profiles.profile_id = ${params.userid}`;
  if(checkForUser.rowCount === 0) notFound();

  
  
  
  const clerkIdSearchedFor = checkForUser.rows[0]['clerk_user_id'];


  const userData = await sql`SELECT sn_profiles.profile_id, sn_profiles.username, 
  sn_profiles.location, sn_profiles.bio_field, 
  sn_profiles.user_level FROM sn_profiles 
  WHERE sn_profiles.clerk_user_id = ${clerkIdSearchedFor}`;

  const profileId = userData.rows[0]['profile_id'];
  const username =  userData.rows[0]['username'];
  const location = userData.rows[0]['location'];
  const bio = userData.rows[0]['bio_field'];

  const userStatus = userData.rows[0]['user_level'];
  


  async function addNewPost(formData) {
    "use server";

    const postTitle = formData.get("posttitle");
    const postContent = formData.get("postcontent");
    const profileNum = formData.get("profilenum");
    const clId = formData.get("cid");
    
    


    // Important - requirements state to use the Clerk id number, not post_profile_id
    const posting = await sql`INSERT INTO sn_posts (post_profile_id, post_clerk_id, post_title, 
      post_content) VALUES (${profileNum}, ${clId}, ${postTitle}, ${postContent})`;
    revalidatePath("/");
    redirect("/");
  }


  // Adds up all 'fist bumps' for all users, then filters out all but the logged
  // in user. Seems convoluted, but necessary when needing to count via a linked
  // junction table and incorporating assigning zero to bumpcounts, when no 'liked'
  // record exists.
  const userPosts = await sql`WITH all_records
  AS
  (SELECT sn_profiles.profile_id, sn_profiles.username, sn_profiles.user_level, sn_profiles.clerk_user_id,
    sn_posts.post_date, sn_posts.post_id, sn_posts.post_title, sn_posts.post_content,
    COALESCE(SUM(sn_postlikes.postlike_val),0) AS bumpcount
    FROM sn_profiles
    JOIN sn_posts ON sn_posts.post_clerk_id = sn_profiles.clerk_user_id
    LEFT JOIN sn_postlikes ON sn_posts.post_id = sn_postlikes.post_id
    WHERE sn_profiles.clerk_user_id = ${clerkIdSearchedFor}
    GROUP BY  sn_profiles.profile_id, sn_posts.post_date, sn_posts.post_id
    ORDER BY sn_posts.post_date DESC, bumpcount DESC, sn_posts.post_id)
  SELECT
    profile_id, username, post_date, post_title, post_content, clerk_user_id, user_level, bumpcount
  FROM all_records
  WHERE clerk_user_id = ${clerkIdSearchedFor}`;



return (
  <>
  
  <div>
  <h3>Profile:</h3>
    <div className="post">
    <p>Username: {username}</p><br/>
    <p>Id Number: {profileId}</p><br/>
    <p>Location: {location}</p><br/>
    <p>Bio: {bio}</p><br/>
    </div>
    <br/>
    { userId === clerkIdSearchedFor && 
    <>
    <h3>Create Post</h3>
    <form action={addNewPost}>
      <label>Post Title:</label>
      <input name="posttitle" 
        placeholder="Post Title"
        required
      />

      <label>Content:</label>
      <textarea name="postcontent" 
        placeholder="Post Content"
        rows="3"
        cols="63"
        required
      >
      </textarea><br/>
      <input name="profilenum"
        value={profileId}
        required
        readOnly
        hidden
      />
      <input name="cid"
        value={clerkIdSearchedFor}
        readOnly
        required
        hidden
      />
      <button>Submit</button>
    </form>
    </> }
  </div>
  <h3>Posts:</h3>
  {userPosts.rows.map((post) => {
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



