import "./globals.css";

export const metadata = {
  title: "RoboVedanta - Premium STEM & Robotics Education",
  description: "Empowering students with project-based robotics and AI education. CBSE and ICSE aligned curriculum for Grades 1-12.",
  keywords: ["robotics education", "AI learning", "STEM education", "CBSE robotics", "ICSE robotics", "project-based learning"],
};

import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-500 text-white overflow-x-hidden">
        <ConditionalWrapper>
          {children}
        </ConditionalWrapper>
      </body>
    </html>
  );
}
