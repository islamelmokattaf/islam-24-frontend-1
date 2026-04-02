"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Navigation } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/api";

interface Props {
  navigation: Navigation | null;
}

export default function Header({ navigation }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = navigation?.logo?.url;
  const logoText = navigation?.logo_text || "MySite";
  const links = navigation?.links || [];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            <Image
              src={getStrapiMediaUrl(logoUrl)}
              alt={logoText}
              width={36}
              height={36}
              className="h-9 w-auto"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white font-bold text-sm">
              {logoText.charAt(0)}
            </span>
          )}
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            {logoText}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target={link.is_external ? "_blank" : undefined}
              rel={link.is_external ? "noopener noreferrer" : undefined}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-50"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target={link.is_external ? "_blank" : undefined}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
