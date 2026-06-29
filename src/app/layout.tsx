import type { Metadata } from 'next';
import { Poppins, Pacifico } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { MagicCursor } from '@/components/ui/MagicCursor';
import { buildLocalBusinessSchema, buildWebSiteSchema } from '@/lib/jsonld';
import { OG_DEFAULTS, SITE_URL, BRAND } from '@/content/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: OG_DEFAULTS.title,
    template: `%s — ${BRAND.name}`,
  },
  description: OG_DEFAULTS.description,
  openGraph: {
    siteName: BRAND.name,
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH" className={`${poppins.variable} ${pacifico.variable}`}>
      <head>
        <JsonLd schema={[buildWebSiteSchema(), buildLocalBusinessSchema()]} />
      </head>
      <body>
        <MagicCursor />
        {/* Skip-to-content for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
