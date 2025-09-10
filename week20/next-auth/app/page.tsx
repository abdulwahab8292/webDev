import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}


