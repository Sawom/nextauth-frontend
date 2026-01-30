import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {
        session?.user &&
        <>
          <h1 className="text-4xl text-center mt-10">Welcome {session?.user?.name}</h1>
          <h1 className="text-4xl text-center mt-10">Logged In email: {session?.user?.email}</h1>
          <Image
            src={session?.user?.image as string || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211471.png"}
            alt="User Image"
            width={100}
            height={100}
            className="mx-auto rounded-full mt-5"
          />
        </>
      }
    </div>
  );
};

export default DashboardPage;
