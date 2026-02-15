"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import { Locale, t } from "@/lib/i18n"
import { Container } from "./Container"
import { LocaleSwitch } from "./LocaleSwitch"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import { useSession } from "@/app/contexts/SessionContext"

interface NavbarProps {
  locale: Locale
}

export function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useSession()
  const tr = t(locale)

  const links = [
    { href: `/${locale}`, label: tr.nav.home },
    { href: `/${locale}/courses`, label: tr.nav.courses },
    { href: `/${locale}/pricing`, label: tr.nav.pricing },
    { href: `/${locale}/about`, label: tr.nav.about },
    { href: `/${locale}/contact`, label: tr.nav.contact },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-stroke bg-bg/80 backdrop-blur dark:border-night-stroke dark:bg-night-bg/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-soft dark:bg-night-surface">
              <Image src="/logo.png" alt={tr.brand} fill className="object-contain p-1" />
            </div>
            <span className="hidden text-sm font-semibold text-ink dark:text-night-text sm:block">
              {tr.brand}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm transition ${
                  isActive(link.href)
                    ? "bg-brand text-white"
                    : "text-ink/80 hover:bg-white hover:text-ink dark:text-night-text/80 dark:hover:bg-night-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LocaleSwitch current={locale} />
            <ThemeToggle />

            {/* User menu */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-full"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || ""}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
                      {user.name?.[0] || "U"}
                    </div>
                  )}
                </Button>

                {isOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-stroke bg-white p-1 shadow-soft dark:border-night-stroke dark:bg-night-surface">
                    <Link
                      href={`/${locale}/dashboard`}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-ink hover:bg-bg dark:text-night-text dark:hover:bg-night-bg"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {tr.nav.dashboard}
                    </Link>
                    <Link
                      href={`/${locale}/profile`}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-ink hover:bg-bg dark:text-night-text dark:hover:bg-night-bg"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      {tr.nav.profile}
                    </Link>
                    <Link
                      href={`/${locale}/settings`}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-ink hover:bg-bg dark:text-night-text dark:hover:bg-night-bg"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      الإعدادات
                    </Link>
                    <hr className="my-1 border-stroke dark:border-night-stroke" />
                    <button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      <LogOut className="h-4 w-4" />
                      {tr.nav.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={`/${locale}/login`}>
                  <Button variant="ghost" size="sm">
                    {tr.nav.login}
                  </Button>
                </Link>
                <Link href={`/${locale}/register`}>
                  <Button size="sm">
                    {tr.nav.register}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-stroke py-4 md:hidden dark:border-night-stroke">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2 text-sm transition ${
                    isActive(link.href)
                      ? "bg-brand text-white"
                      : "text-ink/80 hover:bg-white hover:text-ink dark:text-night-text/80 dark:hover:bg-night-surface"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
