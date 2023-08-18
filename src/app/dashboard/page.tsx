import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = () => {
  const session = getServerSession(authOptions)
  return <div>Page</div>;
}

export default Page;