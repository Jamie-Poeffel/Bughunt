import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "BugHunt — Feedback, das weiterbringt",
  description: "Die zentrale Plattform, um Bugs aus all deinen Apps und Websites zu sammeln, zu organisieren und zu lösen.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
