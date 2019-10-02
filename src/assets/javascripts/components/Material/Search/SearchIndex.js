import lunr from "expose-loader?lunr!lunr"

export const buildSearchIndex = (docs, lang, enabledFilters) => {
  return lunr(function() {
    const filters = {
      "search.pipeline.trimmer": lunr.trimmer,
      "search.pipeline.stopwords": lunr.stopWordFilter
    }

    const pipeline = enabledFilters.map(name => filters[name])

    /* Remove stemmer, as it cripples search experience */
    this.pipeline.reset()
    if (pipeline) this.pipeline.add(...pipeline)

    /* Set up alternate search languages */
    if (lang.length === 1 && lang[0] !== "en" && lunr[lang[0]]) {
      this.use(lunr[lang[0]])
    } else if (lang.length > 1) {
      this.use(lunr.multiLanguage(...lang))
    }

    /* Index fields */
    this.field("title", { boost: 10 })
    this.field("text")
    this.ref("location")

    /* Index documents */
    docs.forEach(doc => this.add(doc))
  })
}
