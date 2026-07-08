export function downloadCSV(data, filename) {
  if (!data || data.length === 0) return

  const header = 'Phone Number\n'
  const rows = data.map(phone => `${phone}`).join('\n')
  const content = header + rows

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
