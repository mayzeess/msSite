import type { Metadata } from "next";
import LoginAdmin from "@/app/components/loginAdmin";

export const metadata: Metadata = {
  title: "admin",
  description: "admin",
  keywords: '',
};

export default function admin() {
  return (
    <div>
        <LoginAdmin />
    </div>
  );
}