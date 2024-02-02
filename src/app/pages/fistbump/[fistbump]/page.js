import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function FistBump({params}){
  "use server";
  //const postNum = params['fistbump'];
  console.log(params.fistbump);

  return (
    <div><p>Registering Fist Bump for record {params.fistbump}</p></div>
    );
}