import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SheetLabel } from "@/components/blueprint/sheet-label";
import { Container } from "@/components/site/container";
import { blogIndexPaths, blogPath, formatDate, getPosts } from "@/lib/blog";
import { getMessages, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

/** A language without visible posts has no blog: this page 404s there. */
async function resolve(params: PageProps<"/[lang]/blog">["params"]) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const posts = getPosts(lang);
  if (posts.length === 0) notFound();
  return { lang, posts, t: getMessages(lang).blog };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang, t } = await resolve(params);
  return pageMetadata(lang, blogIndexPaths(), { title: t.title, description: t.description });
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const { lang, posts, t } = await resolve(params);

  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h1 className="text-h1 lg:col-span-7">{t.title}</h1>
        <p className="max-w-[46ch] text-lead text-ink-muted lg:col-span-5">{t.intro}</p>
      </div>

      <ul className="mt-12 border-b border-ink">
        {posts.map((post) => (
          <li key={post.slug} className="grid gap-3 border-t border-ink py-6 lg:grid-cols-12 lg:gap-6">
            <p className="font-mono text-label text-ink-muted uppercase lg:col-span-3">
              <time dateTime={post.date}>{formatDate(lang, post.date)}</time>
              <span aria-hidden="true"> · </span>
              {t.readingTime.replace("{minutes}", String(post.readingTime))}
            </p>
            <div className="flex flex-col gap-3 lg:col-span-9">
              {post.review && (
                <span className="self-start rounded-tag bg-warning-bg px-1.5 py-0.5 font-mono text-label text-warning uppercase">
                  {t.draft}
                </span>
              )}
              <h2 className="max-w-[40ch] text-h3">
                <a
                  href={blogPath(lang, post.slug)}
                  className="transition-colors duration-150 hover:text-blueprint hover:underline hover:underline-offset-4"
                >
                  {post.title}
                </a>
              </h2>
              <p className="max-w-[68ch] text-body text-ink-muted">{post.description}</p>
              <SheetLabel>{post.tags.join(" · ")}</SheetLabel>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
