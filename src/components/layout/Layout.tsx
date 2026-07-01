import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Grain } from "@/components/ui/Grain";
import { PageTransition } from "@/components/layout/PageTransition";
import { ParticleField } from "@/components/three/ParticleField";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  const showBackground = pathname !== "/";
  return (
    <div className="relative flex min-h-screen flex-col">
      <Grain />
      {showBackground && <ParticleField fixed opacity={0.35} count={200} />}
      <ScrollToTop />
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  );
}
