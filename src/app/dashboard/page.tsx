import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = () => {
  const session = getServerSession(authOptions)
  return <div>{JSON.stringify(session)}</div>;
}

export default Page;
