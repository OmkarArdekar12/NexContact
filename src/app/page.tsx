import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-5 gap-5 sm:p-20 font-sans">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to NexContact</h1>
        <h2 className="mt-3 text-3xl font-semibold">
          A Contact Manager Application
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Manage your contacts easily and efficiently
        </p>
      </div>
      <Image
        src="/logo.png"
        alt="contact manager"
        width={300}
        height={300}
        className="rounded-lg drop-shadow-[1px_1px_0_rgb(0,0,0)]"
      />
      <div className="text-center">
        <p className="mt-2 text-lg text-gray-600">
          Start managing your contacts today!
        </p>
      </div>
    </div>
  );
}
