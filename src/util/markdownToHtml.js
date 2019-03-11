import remark from 'remark'
import remarkHtml from 'remark-html'

function markdownToHtml(markdown) {
  const content = remark()
                  .use(remarkHtml)
                  .processSync(markdown)
                  .toString()
  return content
}

export default markdownToHtml