import { buildSearchIndex } from "./SearchIndex"

addEventListener("message", event => {
  const docs = event.data.docs
  const lang = event.data.lang
  const filters = event.data.filters
  const index = buildSearchIndex(docs, lang, filters)
  const result = JSON.stringify(index)
  postMessage(result)
})
