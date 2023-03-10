import SharedHead from "@/components/SharedHead";
import config from "@/config";
import { getPage } from "@/lib/ghost";
import DefaultSEO from "@/next-seo.config";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import Script from "next/script";

async function getData(slug: string) {
  const page = await getPage(undefined, slug);

  if (!page.id) return { not_found: true };

  const title = page.og_title ?? page.meta_title ?? page.title.replace("[NO_INDEX]", "").replace("[NO_TITLE]", "")

  const openGraph: OpenGraph = {
    title: `${title} - ${config.name}`,
    description: page.og_description ?? page.meta_description ?? page.excerpt,
    article: {
      publishedTime: page.published_at,
      modifiedTime: page.updated_at,
    },
    url: `${config.baseUrl}/${page.slug}`,
    images: [{
      url: page.og_image ?? DefaultSEO.openGraph.images[0].url,
      alt: page.og_description ?? page.meta_description ?? page.excerpt
    }]
  }

  return { page, title, openGraph };
}

export default async function Head({ params: { slug } }) {
  const { page, title, openGraph } = await getData(slug);

  return (
    <>
      <SharedHead/>
      <Script src="/scripts/cards.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></Script>
      <NextSeo {...DefaultSEO} 
        title={page?.meta_title ?? title}
        description={page?.meta_description ?? page?.excerpt} 
        canonical={openGraph?.url}
        openGraph={openGraph ?? {}}
      />
    </>
  );
}
