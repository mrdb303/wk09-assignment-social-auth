import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateProfile() {
  const { userId } = auth();
  //const { email_address } = auth();

  async function addNewProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    const location = formData.get("location");

    await sql`INSERT INTO sn_profiles (clerk_user_id, username, bio_field, location) VALUES (${userId}, ${username}, ${bio}, ${location})`;
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Create Profile</h2>
      <form action={addNewProfile}>
        <label>Your Chosen Username: </label>
        <input name="username" 
          placeholder="Username"
        />
        <label>Your Location: </label>
        <input name="location" 
          placeholder="location"
        />

        <label>Your Bio: </label>
        <textarea name="bio" 
          placeholder="Bio"
          cols="63"
          rows="3">
        </textarea><br/>
        <button>Submit</button>
      </form>
    </div>
  );
}