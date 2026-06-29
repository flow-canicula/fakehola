export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/order/thanks/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
