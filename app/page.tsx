import { redirect } from "next/navigation";

// Root Route: User ko seedha login page par redirect karna
export default function HomePage() {
  redirect("/login");
}
