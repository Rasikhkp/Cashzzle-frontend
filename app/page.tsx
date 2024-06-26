import Link from "next/link";
import { garamond } from "./fonts";
import { Button } from "@/components/ui/button";
import UserProfile from "./app/_components/user-profile";

const Home = () => {
  return (
    <div className="bg-[url('../public/background4.jpg')] bg-cover bg-center flex flex-col h-screen">
      <nav className="px-10 py-5 flex-none flex justify-between">
        <p className={`${garamond.className} font-bold text-3xl`}>Cashzzle.</p>
        <UserProfile />
      </nav>

      <main className="flex flex-col flex-1 justify-center items-center h-40">
        <p className={`${garamond.className} text-5xl font-bold`}>
          Your Key to Smarter Spending and Saving.
        </p>
        <p
          className={`${garamond.className} text-lg text-center w-[556px] my-11 font-medium`}
        >
          Cashzzle makes budgeting effortless. Track your expenses, manage your
          savings, and stay on top of your finances with ease.
        </p>
        <Link href={"/app"}>
          <Button size={"lg"}>Get started</Button>
        </Link>
      </main>

      <footer className="border-t text-sm border-gray-200 flex-none py-10 flex justify-center items-center w-full text-gray-500">
        @2024 Cashzzle. All rights reserved
      </footer>
    </div>
  );
};

export default Home;
