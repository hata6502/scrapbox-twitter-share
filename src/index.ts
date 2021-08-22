import twitter from "twitter-text";

// @ts-expect-error The type is not defined.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
scrapbox.PageMenu.addMenu({
  title: "Share to Twitter",
  image: "https://i.gyazo.com/a4dfaf020789cbf745fa5c916e3a107e.png",
  onClick: () => {
    const pageElement = document.querySelector(".page");

    if (!(pageElement instanceof HTMLElement)) {
      throw new Error("The page element is not an HTMLElement.");
    }

    const fullText = `${location.href}
${pageElement.innerText.replace(/\n\n/g, "\n")}`;

    const parsedTweet = twitter.parseTweet(fullText);

    const text = fullText.slice(
      parsedTweet.validRangeStart,
      parsedTweet.validRangeEnd
    );

    open(
      `https://twitter.com/intent/tweet?${new URLSearchParams({
        text,
      }).toString()}`
    );
  },
});
