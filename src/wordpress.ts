import { useEffect, useState } from 'react'
import { DESIGNS, WORK, type Design, type WorkPiece } from './data'
import { DEFAULT_SITE_CONTENT, type SiteContent } from './siteContent'

export interface WordPressContent {
  work: WorkPiece[]
  designs: Design[]
  site: SiteContent
}

const WORDPRESS_URL = (import.meta.env.VITE_WORDPRESS_URL ?? '').replace(/\/$/, '')
const CONTENT_ENDPOINT = `${WORDPRESS_URL}/wp-json/kevin-inks/v1/content`

const fallbackContent: WordPressContent = {
  work: [...WORK],
  designs: [...DESIGNS],
  site: DEFAULT_SITE_CONTENT,
}

let contentRequest: Promise<WordPressContent> | null = null

function isWordPressContent(value: unknown): value is WordPressContent {
  if (!value || typeof value !== 'object') return false
  const content = value as Partial<WordPressContent>
  return Array.isArray(content.work) && Array.isArray(content.designs)
}

export async function getWordPressContent(): Promise<WordPressContent> {
  if (!WORDPRESS_URL) return fallbackContent

  contentRequest ??= fetch(CONTENT_ENDPOINT, {
    headers: { Accept: 'application/json' },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(`WordPress returned ${response.status}`)
      const content: unknown = await response.json()
      if (!isWordPressContent(content)) throw new Error('WordPress returned an unexpected response')

      return {
        work: content.work.length ? content.work : fallbackContent.work,
        designs: content.designs.length ? content.designs : fallbackContent.designs,
        site: content.site ? { ...DEFAULT_SITE_CONTENT, ...content.site } : DEFAULT_SITE_CONTENT,
      }
    })
    .catch((error) => {
      console.warn('Kevin Inks: using local content because WordPress could not be reached.', error)
      return fallbackContent
    })

  return contentRequest
}

export function useWordPressContent() {
  const [content, setContent] = useState<WordPressContent>(fallbackContent)

  useEffect(() => {
    let active = true
    getWordPressContent().then((nextContent) => {
      if (active) setContent(nextContent)
    })
    return () => {
      active = false
    }
  }, [])

  return content
}
