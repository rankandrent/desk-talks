export const youTubeId = (url?: string | null): string | undefined => {
  if (!url) return undefined
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  )
  return match?.[1]
}

export const youTubeEmbed = (url?: string | null) => {
  const id = youTubeId(url)
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined
}

export const spotifyEmbed = (url?: string | null) => {
  const match = url?.match(/open\.spotify\.com\/(episode|show|track)\/([A-Za-z0-9]+)/)
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : undefined
}

// Only track/playlist URLs (soundcloud.com/<artist>/<track>) can be embedded.
export const soundCloudEmbed = (url?: string | null) =>
  url && /soundcloud\.com\/[^/?#]+\/[^/?#]+/.test(url)
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ffd62d&visual=false`
    : undefined
