import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import UserPosts from "@/components/UserPosts"


export default async function TimeLine({params}){
  "use server";

  const { userId } = auth();


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
  const username = userData.rows[0]['username'];
  const location = userData.rows[0]['location'];
  const bio = userData.rows[0]['bio_field'];
 


  async function addNewPost(formData) {
    "use server";
    const postTitle = formData.get("posttitle");
    const postContent = formData.get("postcontent");
    

    // Important - requirements state to use the Clerk id number, not post_profile_id
    await sql`INSERT INTO sn_posts (post_profile_id, post_clerk_id, post_title, 
      post_content) VALUES (${profileId}, ${userId}, ${postTitle}, ${postContent})`;
    revalidatePath("/pages/create_post");
    redirect("/pages/all_posts");
  }



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
      />

      <label>Content:</label>
      <textarea name="postcontent" 
        placeholder="Post Content"
        rows="3"
        cols="63"
      >
      </textarea><br/>
      <button>Submit</button>
    </form>
    </> }
  </div>
  
  <UserPosts profileId={{profileId}}/>
  </>
);


}