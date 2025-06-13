import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto justify-center py-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          src="/images/not-found.png"
          className="m-0 rounded-xl"
          width={300}
          height={300}
          alt="Page Not Found"
          sizes="300px"
          priority={true}
          title="Page Not Found"
        />
      </div>
    </div>
  );
}
