import twitter from "twitter-text";

const runScrapboxTwitterShare = ({ appURL }: { appURL: string }): void => {
  // @ts-expect-error The type is not defined.
  scrapbox.PageMenu.addMenu({
    title: "Share to Twitter",
    image: "https://i.gyazo.com/a4dfaf020789cbf745fa5c916e3a107e.png",
    onClick: async () => {
      const pageResponse = await fetch(
        `${appURL}/api/pages/${
          // @ts-expect-error The type is not defined.
          scrapbox.Project.name
        }/${
          // @ts-expect-error The type is not defined.
          scrapbox.Page.title
        }`
      );

      if (!pageResponse.ok) {
        throw new Error(`${pageResponse.status} ${pageResponse.statusText}`);
      }

      const page = await pageResponse.json();

      // @ts-expect-error The type is not defined.
      const fullText = `${scrapbox.Page.title}
${location.href}
${page.descriptions.join("\n")}`;

      const parsedTweet = twitter.parseTweet(fullText);

      const text = fullText.slice(
        parsedTweet.validRangeStart,
        parsedTweet.validRangeEnd + 1
      );

      open(
        `https://twitter.com/intent/tweet?${new URLSearchParams({
          text,
        }).toString()}`
      );
    },
  });
};

export { runScrapboxTwitterShare };
