const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export function getYouTubeVideoId(value) {
  if (!value) return null
  if (VIDEO_ID_PATTERN.test(value)) return value

  try {
    const url = new URL(value)
    const hostname = url.hostname.replace(/^www\./, '')
    let videoId = null

    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0]
    } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        videoId = url.searchParams.get('v')
      } else {
        const [type, id] = url.pathname.split('/').filter(Boolean)
        if (type === 'shorts' || type === 'embed') videoId = id
      }
    }

    return VIDEO_ID_PATTERN.test(videoId ?? '') ? videoId : null
  } catch {
    return null
  }
}
