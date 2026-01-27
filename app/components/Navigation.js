"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "🏠", label: "หน้าแรก" },
  { href: "/gallery", icon: "📸", label: "แกลเลอรี่" },
  { href: "/games", icon: "🎮", label: "เกม" },
  { href: "/love-letter", icon: "💌", label: "จดหมาย" },
  { href: "/surprise", icon: "🎁", label: "เซอร์ไพรส์" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass py-3 px-4 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item text-center ${
              pathname === item.href ? "text-white active" : "text-white/70"
            }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="text-xs">{item.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
