import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SheetLabel } from "@/components/blueprint/sheet-label";
import { Container } from "@/components/site/container";
import { ButtonLink } from "@/components/ui/button";
import { blogPath, formatDate, getPost, getPosts, renderPost } from "@/lib/blog";
import { getMessages, hasLocale, sectionHref, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site-config";
import { getAbsoluteUrl } from "@/lib/site-url";

export const dynamicParams = false;
export const generateStaticParams = ({ params }: { params: { lang: string } }) =>
  hasLocale(params.lang) ? getPosts(params.lang).map((post) => ({ slug: post.slug })) : [];

async function resolve(params: PageProps<"/[lang]/blog/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();
  return { lang, post };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, post } = await resolve(params);
  return pageMetadata(
    lang,
    { [lang]: blogPath(lang, post.slug) },
    {
      title: post.title,
      description: post.description,
      article: { publishedTime: post.date, modifiedTime: post.updated },
    }
  );
}

const textLink =
  "inline-flex min-h-11 items-center text-[15px] font-semibold text-blueprint underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-blueprint-hover hover:decoration-2";

/**
 * One post: the question as the title, the answer in the first paragraph
 * (styled as the lead), the body, then one box with the next step.
 */
export default async function BlogPost({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, post } = await resolve(params);
  const t = getMessages(lang);
  const url = getAbsoluteUrl(blogPath(lang, post.slug));
  const organization = { "@type": "Organization", name: SITE_NAME, url: getAbsoluteUrl(`/${lang}`) };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: t.locale,
    keywords: post.tags.join(", "),
    mainEntityOfPage: url,
    author: organization,
    publisher: organization,
  };

  return (
    <Container className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article className="mx-auto max-w-[68ch]">
        <a href={blogPath(lang)} className={textLink}>
          {t.blog.all}
        </a>

        {post.review && (
          <p className="mt-6 rounded-ui bg-warning-bg px-4 py-3 text-small text-warning">
            <strong>{t.blog.draft}.</strong> {t.blog.draftNote.replace("{review}", post.review)}
          </p>
        )}

        <header className="mt-8">
          <SheetLabel>{post.tags.join(" · ")}</SheetLabel>
          <h1 className="mt-5 text-h1">{post.title}</h1>
          <p className="mt-6 flex flex-wrap gap-x-3 font-mono text-label text-ink-muted uppercase">
            <time dateTime={post.date}>{formatDate(lang, post.date)}</time>
            {post.updated !== post.date && (
              <span>
                {t.blog.updated} <time dateTime={post.updated}>{formatDate(lang, post.updated)}</time>
              </span>
            )}
            <span>{t.blog.readingTime.replace("{minutes}", String(post.readingTime))}</span>
          </p>
        </header>

        <div className="article mt-12" dangerouslySetInnerHTML={{ __html: renderPost(lang, post) }} />

        <EndBox locale={lang} service={post.service} />
      </article>
    </Container>
  );
}

/** The one next step (the page's only orange), plus the matching service and the reference. */
function EndBox({ locale, service }: { locale: Locale; service: number }) {
  const t = getMessages(locale);
  const s = t.blog.end;
  const serviceName = t.servicesSection.rows[service]?.title;
  if (!serviceName) throw new Error(`blog: no service with index ${service}`);

  return (
    <aside aria-labelledby="next-step" className="mt-16 rounded-ui border border-ink bg-surface p-6 md:p-8">
      <h2 id="next-step" className="text-h3">
        {s.title}
      </h2>
      <p className="mt-2 text-body text-ink-muted">{s.text}</p>
      <ButtonLink href={sectionHref(locale, "contact")} variant="cta" className="mt-6">
        {s.cta}
      </ButtonLink>
      <ul className="mt-4 flex flex-wrap gap-x-6">
        <li>
          <a href={sectionHref(locale, "services")} className={textLink}>
            {s.service.replace("{service}", serviceName)}
          </a>
        </li>
        <li>
          <a href={sectionHref(locale, "reference")} className={textLink}>
            {s.reference}
          </a>
        </li>
      </ul>
    </aside>
  );
}
