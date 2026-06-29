import type { Metadata } from 'next';
import { SITE_URL, OG_DEFAULTS, BRAND } from '@/content/site';

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  ogImage,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle = title
    ? `${title} — ${BRAND.name}`
    : OG_DEFAULTS.title;
  const resolvedDescription = description ?? OG_DEFAULTS.description;
  const canonical = `${SITE_URL}${path}`;
  const image = ogImage ?? OG_DEFAULTS.image;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: BRAND.name,
      images: [
        {
          url: image,
          width: OG_DEFAULTS.imageWidth,
          height: OG_DEFAULTS.imageHeight,
          alt: `${BRAND.name} — Kapampangan Bakery`,
        },
      ],
      locale: 'en_PH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
