import Link from "next/link"
import { Locale, t } from "@/lib/i18n"
import { Container } from "./Container"
import { social } from "@/lib/social"
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react"

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const tr = t(locale)

  const links = [
    { href: `/${locale}/courses`, label: tr.nav.courses },
    { href: `/${locale}/pricing`, label: tr.nav.pricing },
    { href: `/${locale}/about`, label: tr.nav.about },
    { href: `/${locale}/contact`, label: tr.nav.contact },
    { href: `/${locale}/terms`, label: tr.nav.terms },
    { href: `/${locale}/privacy`, label: tr.nav.privacy },
  ]

  const socialLinks = [
    { icon: Facebook, href: social.facebook, label: "Facebook" },
    { icon: Instagram, href: social.instagram, label: "Instagram" },
    { icon: Youtube, href: social.youtube, label: "YouTube" },
  ]

  return (
    <footer className="mt-16 border-t border-stroke bg-white dark:border-night-stroke dark:bg-night-bg">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ink dark:text-night-text">
              {tr.brand}
            </h3>
            <p className="text-sm text-muted dark:text-night-muted">
              {locale === "ar"
                ? "منصة تعليمية متخصصة في التنمية البشرية وعلم النفس التطبيقي"
                : "Educational platform specializing in personal development and applied psychology"}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="rounded-xl bg-bg p-2 text-muted transition hover:bg-brand hover:text-white dark:bg-night-surface dark:text-night-muted"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-ink dark:text-night-text">
              {tr.footer.links}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-brand dark:text-night-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`tel:${social.phone}`}
                  className="flex items-center gap-2 text-sm text-muted transition hover:text-brand dark:text-night-muted"
                >
                  <Phone className="h-4 w-4" />
                  {social.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${social.email}`}
                  className="flex items-center gap-2 text-sm text-muted transition hover:text-brand dark:text-night-muted"
                >
                  <Mail className="h-4 w-4" />
                  {social.email}
                </Link>
              </li>
              <li>
                <Link
                  href={social.whatsappWaMe}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-muted transition hover:text-brand dark:text-night-muted"
                >
                  <Phone className="h-4 w-4" />
                  {locale === "ar" ? "واتساب" : "WhatsApp"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-ink dark:text-night-text">
              {locale === "ar" ? "النشرة البريدية" : "Newsletter"}
            </h4>
            <p className="text-sm text-muted dark:text-night-muted">
              {locale === "ar"
                ? "اشترك ليصلك كل جديد"
                : "Subscribe to get updates"}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 rounded-xl border border-stroke bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/20 dark:border-night-stroke dark:bg-night-surface"
              />
              <Button size="sm">
                {locale === "ar" ? "اشتراك" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stroke py-4 text-center text-xs text-muted dark:border-night-stroke dark:text-night-muted">
          {tr.footer.rights} {new Date().getFullYear()} {tr.brand}
        </div>
      </Container>
    </footer>
  )
}
