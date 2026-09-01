import { bundledLanguages, codeToHtml } from 'shiki'

/**
 * Server component: highlighting happens at build time, so no Shiki runtime or
 * theme payload reaches the browser.
 *
 * `github-dark-default` is the one theme choice for the site — it sits on a
 * near-black ground that reads correctly against the #1a191d background. Change
 * it here rather than per call site.
 */
const THEME = 'github-dark-default'

/** Rendered unhighlighted when a language has no grammar in the bundle. */
const FALLBACK_LANG = 'text'

/**
 * Aliases for languages Shiki has no grammar for.
 *
 * IEC 61131-3 Structured Text derives from Pascal — `IF/THEN/ELSIF/END_IF`,
 * `:=` assignment, and `FUNCTION_BLOCK` all tokenize close enough to read
 * correctly. Ladder and Function Block Diagram are graphical languages and
 * belong in `figures`, not here.
 */
const LANGUAGE_ALIASES: Record<string, string> = {
  st: 'pascal',
  'structured-text': 'pascal',
  structuredtext: 'pascal',
  iecst: 'pascal',
  'iec-61131-3': 'pascal',
}

function resolveLanguage(language: string): string {
  const key = language.trim().toLowerCase()
  const aliased = LANGUAGE_ALIASES[key] ?? key
  // Unknown languages throw inside codeToHtml, which would fail the build. A
  // case study should never be unpublishable over a syntax-highlighting theme,
  // so anything unrecognized degrades to unhighlighted text.
  return aliased in bundledLanguages ? aliased : FALLBACK_LANG
}

export default async function CodeBlock({ code, language }: { code: string; language: string }) {
  const html = await codeToHtml(code.trimEnd(), {
    lang: resolveLanguage(language),
    theme: THEME,
  })

  return (
    <div
      // `[&_pre]:!bg-transparent` overrides the inline background Shiki emits
      // from its theme, so the block sits on the panel's own ground instead of
      // stacking a second, darker box inside it.
      className="mt-4 overflow-x-auto border border-white/12 bg-white/[0.02] p-5 text-sm leading-6 [&_pre]:!bg-transparent [&_pre]:m-0"
      // Shiki output is generated at build time from code committed in this
      // repo — no user input reaches this path.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
