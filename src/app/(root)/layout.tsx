import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import ChatSupport from "../components/ChatSupport";
import { ToastProvider } from "../context/toastContext";
import DarkMode from "../components/DarkMode";
import FloatingWidget from "../components/FloatingWidget";
import { error } from "console";

export default async function SeekerLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const url = process.env.API_URL || "http://192.168.5.148:3001";

  let user = null;
  try {
    const res = await fetch(`${url}/profile/me`, {
      headers: { cookie: `jwt=${token}` },
      cache: "no-cache",
    });
    console.log(res, "this is the res")
    alert(res)
    if (res.ok) {
      const data = await res.json();
      user = data?.data;
    } else {
      redirect("/signin");
    }
  } catch (error) {
    console.log("Error fetching user", error);
    // redirect("/signin");
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
