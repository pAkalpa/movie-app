import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function MoviesPage() {
  const session = await getServerSession();
  console.log("🤬 ~ file: page.tsx:6 ~ MoviesPage ~ session:", session);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div>
      <h1>Movies</h1>
    </div>
  );
}
