import WobbleNavbar from "@/components/Dashboard/Home/WobbleNavbar";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="">
        {children}
      </main>
    </ThemeProvider>
  );
}
