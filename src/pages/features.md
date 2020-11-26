---
title: Eleventufte Features
subtitle: Just in case you needed a few extra markdown patterns to remember.
permalink: /features/
---
In addition to basic markdown features like *emphasis,* **strong text,** [links](http://example.com), and `inline code`, the tufte-markdown parser pays special attention to figures and footnotes. The official [Tufte-CSS site](https://edwardtufte.github.io/tufte-css/) explains the more advanced features in detail, but we're trying to poke and prod things a bit to eliminate some of the manual HTML entry that's still necessary.

## Sidenotes and Marginalia

Here's where things really get exciting. Markdown footnotes[^1] are a convenient way to move digressions and asides out of the primary flow of a document, but shoving them to the bottom of a long page is no good, either. In his books, Tufte instead uses sidenotes, which keep the asides as close as possible to the related text without breaking the flow.

[^1]: [Footnotes](https://www.markdownguide.org/extended-syntax#footnotes)

weren't actually part of the original markdown spec, but they've become a popular bolt-on.

During a heated yak-shaving conversation about enhancements to our site[^autogram], [Karen McGrane](https://karenmcgrane.com) pointed [Ethan Marcotte](https://ethanmarcotte.com) and I to an excellent post by Koos Looijesteijn outlining [*his* approach to sidenotes](https://www.kooslooijesteijn.net/blog/semantic-sidenotes). That in turn led to Gwern Branwen's impressive [evaluation of damn near every sidenote implementation on the web](https://www.gwern.net/Sidenotes). And that, in turn, led me to tufte-markdown, which is how we got into this mess.

[^autogram]: {-} Karen and Ethan are my partners in crime at [Autogram](https://autogram.is), a freshly-minted strategic consultancy for companies with complicated content needs. If "establishing a consistent domain vocabulary and grammar to streamline design system iteration for complex high-variance content" sounds thrilling to you, hire us.

A few specific formats are supported, with different results: `[^foonote-id]` markers in a paragraph are paired with `[^footnote]: Footnote text` below the paragraph in which they appear; they get numbered automatically.[^eg] For a *margin note,* with no accompanying number, just add a goofy symbol before the footnote text like so:

```
[^footnote]: {-} This text will appear in the margin without a number.
```

Completely inlined sidenotes — ones without explicit markers in the rest of the text — can be done like so:

```
[^ {-} A little fussy, but not bad once you get used to it.]
```

[^eg]: For example, this little guy.

## Blockquotes and Epigraphs

Blockquotes are handled as one would expect:

[^marlene]

> I love quotations because it is a joy to find thoughts one might have, beautifully expressed with much authority by someone recognized wiser than oneself. —Marlene Dietrich

[^marlene]: {-} ![Image of Marlene Dietrich](https://placeimg.com/400/200/people/sepia)
  Dietrich as Monica Teasdale in _No Highway in the Sky_ (1951). Not really.

Epigraphs, however, are a slightly different treatment common in Tufte's chapter openings. They provide a bit of extra styling for the attribution line.

<div class="epigraph">

> To appreciate and use correctly a valuable maxim requires a genius, a vital appropriating exercise of mind, closely allied to that which first created it.

</div>

[^attribution]The downside is that Epigraphs require hand-coded HTML: `<div class="epigraph">` wrapping the blockquote itself, and a `<footer>` tag wrapping the attribution inside the quoted text.

[^attribution]: {-} We'll see what we can do later; automatically detecting a double-dash on the last line of a blockquote seems like a convenient enough shortcut, and it's used by [markdown-it-attribution](https://www.npmjs.com/package/@gerhobbelt/markdown-it-attribution).

## Images and Figures

Standard markdown image treatments do what you'd expect. Wrapping them in extra divs or figures adds special behavior, though, which can be neat.

![Who wants some alt text? This dude.](https://placeimg.com/800/400/tech/grayscale)

Combining an inline sidenote and an image produces a pretty fancy image-with-caption-in-the-margins effect, though it's not *semantically correct*, and I want to keep fussing with it until I get that fixed. 

[^{-} From Edward Tufte, *Visual Display of Quantitative Information*, page 92.]
![Another thrilling random image, here.](https://placeimg.com/800/300/tech/grayscale)

Finally, full-width figures are possible by wrapping an image in the `<figure class="fullwidth">` tag. Which brings us back to the whole "why not map that to some sensible markdown patterns" issue again, but we'll revisit it sometime later.

<figure class="fullwidth">
![At long last, another image with alt text.](https://placeimg.com/1200/600/tech/grayscale)
</figure>

## The Boring Bits

Things like HTML lists and tables aren't quite as thrilling, but here you go.

1. An ordered list
2. Often full of numbered items
3. Unless they're not, in which case you need…

* An unordered list
* Theoretically orderless
* But often read in ordered

Even tables are possible, though it's a monstrous idea no one should ever really subject themselves to. In the future I'd like to support shortcodes that pipe in an attached `.csv` file instead; seems a bit more humane.

| Column 1      | Column 2     | Column 3  |
| ------------- | ------------ | --------- |
| Cell Contents | More Stuff   | And Again |
| Cell Contents | More Stuff   | And Again |


## Last thoughts

Long term, it's entirely possible that I'll end up pulling out `tufte-markdown` and leaning on a heavily customized version of Eleventy's standard `markdown-it` parser; it's a little easier to extend IMO, and would allow me to leverage work others have done on stuff like cleaner `figure` and `blockquote` attribution, etc. The big hurdle is duplicating `tufte-markdown`'s very specific way of using `H2` tags to open new `<section>` blocks, automatically chunking a long article into meaningful sections with HTML ids generated from the text in the header. It's handy!

Overloading Markdown's semi-standard handling of image title attributes[^titles], and using the title text to generate figure captions, feels like it could improve things quite a bit. Not sure how well that will mesh with formatted and linked captions, alas.

[^titles]: Like so: `![Image Alt](image.jpg Title Text)`

Finally, given how much Tufte's work leans on data visualizations, it'd be nice to integrate a simple chart generation library, possibly wiring it up to the external-csv-file trick I'm dreaming of for the tables. We'll see.