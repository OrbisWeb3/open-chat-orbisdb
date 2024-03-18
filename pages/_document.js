import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Open Chat | OrbisDB</title>
        <meta property="og:title" content="Open Chat | OrbisDB" key="og_title" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/**<link rel="icon" href="/img/favicon.png" />
        <meta property="og:image" content="https://sol.party/img/main_og.png" />*/}
        <meta property="twitter:card" content="summary_large_image" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
