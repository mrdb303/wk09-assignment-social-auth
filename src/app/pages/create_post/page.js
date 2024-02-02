import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function CreatePost(){

  const { userId } = auth();

  const userLevel = await sql`SELECT sn_profiles.profile_id, sn_profiles.user_level FROM sn_profiles 
  WHERE sn_profiles.clerk_user_id = ${userId}`;

  const profileId = userLevel.rows[0]['profile_id'];


  async function addNewPost(formData) {
    "use server";
    const postTitle = formData.get("posttitle");
    const postContent = formData.get("postcontent");
    

    await sql`INSERT INTO sn_posts (post_profile_id, post_title, post_content) VALUES (${profileId}, ${postTitle}, ${postContent})`;
    revalidatePath("/pages/create_post");
    redirect("/pages/all_posts");
  }


return (
  <div>
    <h2>Create Post</h2>
    <form action={addNewPost}>
      <input name="posttitle" 
        placeholder="Post Title"
      />

      <textarea name="postcontent" 
        placeholder="Post Content">
      </textarea>
      <button>Submit</button>
    </form>
  </div>
);


}