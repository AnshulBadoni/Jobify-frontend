// app/(seeker)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { ToastProvider } from "../context/toastContext";
import FloatingWidget from "../components/FloatingWidget";

export default async function SeekerLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const url = process.env.NEXT_PUBLIC_API_URL || "http://192.168.5.148:3001";

  let user = null;
  try {
    console.log(token,"token")
    const res = await fetch(`${url}/profile/me`, {
      headers: { cookie: `jwt=${token}` },
      cache: "no-cache",
    });
    console.log(res,"res)
    if (res.status == 200) {
      const data = await res.json();
      user = data?.data;
    } else {
      redirect("/signin");
    }
  } catch (error) {
    console.log("Error fetching user", error);
    redirect("/signin");
  }

  return (
      <div className="text-gray-900 bg-stone-100 dark:bg-black">
        <main>
          <Navbar />
          <div className="px-2">
            <ToastProvider>
              <div className="lg:mb-2 mb-16 mt-2">{children}</div>
              <FloatingWidget />
            </ToastProvider>
          </div>
        </main>
      </div>
  );
}
