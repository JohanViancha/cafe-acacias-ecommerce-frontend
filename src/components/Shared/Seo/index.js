import Head from "next/head";

export default function Seo({
  title = "Café de Lebrija | Tienda Online",
  description = "Café artesanal colombiano con envío rápido.",
  keywords = "café, café artesanal, lebrija",
  image,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
