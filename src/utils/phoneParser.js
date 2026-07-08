export function parsePhoneNumbers(input) {
  if (!input || typeof input !== 'string') {
    return { valid: [], invalid: [], duplicates: 0 }
  }

  const lines = input.split('\n')
  const seen = new Set()
  const valid = []
  const invalid = []
  let duplicates = 0

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue

    const candidate = extractPhoneNumber(line)
    if (!candidate) {
      if (line.length > 0) invalid.push(line)
      continue
    }

    if (seen.has(candidate)) {
      duplicates++
      continue
    }

    seen.add(candidate)
    valid.push(candidate)
  }

  return { valid, invalid, duplicates }
}

function extractPhoneNumber(text) {
  const cleaned = text
    .replace(/[+\-()\s]/g, '')
    .replace(/[^\d,;|]/g, ' ')
    .split(/[,;|\s]+/)
    .find(part => /^\d{7,15}$/.test(part))

  if (!cleaned) return null

  if (cleaned.length === 10) return `91${cleaned}`
  if (cleaned.length > 10 && cleaned.length <= 15) return cleaned

  return null
}
