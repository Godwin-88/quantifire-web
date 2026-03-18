import fs from 'fs/promises'
import path from 'path'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

/**
 * Load MDX content from the filesystem for a given post slug.
 * Returns null if the file does not exist (falls back to body_mdx from DB).
 */
export async function loadPostMDX(slug: string): Promise<string | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch {
    return null
  }
}
