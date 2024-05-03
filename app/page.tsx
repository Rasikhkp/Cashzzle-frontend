import Link from "next/link";

const Home = () => {
  return (
    <div>
      <p>home</p>
      <Link href={"/app"} className="text-blue-300">
        open app
      </Link>
    </div>
  );
}

export default Home;
