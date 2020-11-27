# Eleventufte

[![Netlify Status](https://api.netlify.com/api/v1/badges/3ff3300b-a127-49a9-bdfd-1833a76e4ea9/deploy-status)](https://eleventufte.netlify.app)

Years back, a team of dedicated obsessives created [tufte-css](https://github.com/edwardtufte/tufte-css), CSS library and Webfont package meant to duplicate the look and feel of [Edward Tufte's much-loved books](https://www.edwardtufte.com/tufte/). The related [tufte-markdown](https://github.com/luhmann/tufte-markdown) project was created to parse (mostly) standard Markdown into the idiosyncratic markup needed to make Tufte's styling sing.

Which brings us to [Eleventy](https://11ty.dev), the lightweight and customizable static site generator. By swapping in `tufte-markdown` for Eleventy's default markdown parser and slapping the `tufte-css` styles into a (fairly) vanilla setup, Elventufte offers a Tufte-like blogging experience in no time flat.

In exchange for some sensible (if slightly prescriptive) restrictions on page structure (always wrap the content in an `<article>` tag, only use `H2` tags for post sections, etc), Tufte-flavored markdown also gives us some cool features like margin notes instead of footnotes and sensible image captions.

Out of the box, Eleventufte provides a simple home page, colophon and contact pages, individual post pages, an archive of posts by year, and a few feeds for syndication. While this project is less than ideal for a fancy, feature-rich blog, it's a nice place to start if you want to crank out a lot of text with footnotes, figures, and a sensible content hierarchy.

## Future Plans

- [ ] Use [eleventy-charts](https://github.com/idris-maps/eleventy-charts#readme) for visualization, the most Tufte of features
- [ ] Cleaner handling of attributed quotes and figures, with less manual HTML.

Give it a shot, nerds.
