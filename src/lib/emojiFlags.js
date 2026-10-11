import twemoji from 'twemoji';

// Windows' system emoji font deliberately renders flag emoji (and a few
// others) as plain two-letter text instead of a colored flag glyph. Twemoji
// swaps emoji characters for small SVG images so flags (and other emoji)
// look the same on every OS/browser.
//
// We run it as a MutationObserver instead of a one-off call because content
// here loads asynchronously (React Query fetches from base44) well after
// the initial render/route change.
export function startEmojiFlagRendering(root = document.body) {
  const parse = () => {
    twemoji.parse(root, {
      // twemoji's own default CDN (twemoji.maxcdn.com) has been shut down
      // for years — the npm package ships no SVGs either, so serve them
      // straight from the GitHub release via jsDelivr instead.
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
      folder: 'svg',
      ext: '.svg',
      className: 'emoji',
    });
  };

  parse();

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      parse();
    });
  });

  observer.observe(root, { childList: true, subtree: true, characterData: true });

  return () => observer.disconnect();
}
