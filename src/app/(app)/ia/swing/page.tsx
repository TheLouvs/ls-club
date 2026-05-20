import IAHeader from "../components/IAHeader";
import MonSwingModule from "../components/MonSwingModule";
import SwingDesktopLayout from "../components/SwingDesktopLayout";
import { MOCK_PROFILE } from "../data";

export default function SwingPage() {
  return (
    <>
      {/* Mobile — existing layout */}
      <div className="flex flex-col h-full lg:hidden" style={{ background: "#071009" }}>
        <IAHeader mode="swing" />
        <MonSwingModule profile={MOCK_PROFILE} />
      </div>

      {/* Desktop (≥1024px) — two-panel layout */}
      <SwingDesktopLayout />
    </>
  );
}
