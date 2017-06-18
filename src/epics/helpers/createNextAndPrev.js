/**
 * @param {Array} items
 * @param {string} url
 * @returns {[{ title: string, url: string } | null]}
 */
const createNextAndPrev = (items, url) => {
  const ascendingSortedItems = [...items].reverse()
  const targetIndex = ascendingSortedItems.findIndex(item => `${item.date.split(' ')[0]}_${item.url}.md` === url)
  if (targetIndex === -1) {
    return []
  }
  const nextIndex = targetIndex === (ascendingSortedItems.length - 1) ? null : targetIndex + 1
  const prevIndex = targetIndex === 0 ? null : targetIndex - 1
  const next = nextIndex !== null ? ascendingSortedItems[nextIndex] : null
  const prev = prevIndex !== null ? ascendingSortedItems[prevIndex] : null
  return [next, prev].map(item => item && ({
    title: item.title,
    url: `/${item.date.split(' ')[0].replace(/-/g, '/')}/${item.url}`,
  }))
}

export default createNextAndPrev
