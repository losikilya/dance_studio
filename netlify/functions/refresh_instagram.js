/* eslint-disable no-undef */
import { getStore } from '@netlify/blobs'

export async function handler() {
  const store = getStore('secrets')
  let token = await store.get('ig_token')
  if (!token) token = process.env.IG_TOKEN

  if (!token) {
    return { statusCode: 500, body: 'No token to refresh' }
  }

  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    const r = await fetch(url)
    const data = await r.json()
    if (!r.ok) {
      return { statusCode: r.status, body: JSON.stringify(data) }
    }

    const newToken = data.access_token || token
    if (newToken && newToken !== token) {
      await store.set('ig_token', newToken)
    }
    // даже если token не поменялся — IG продлевает его срок (expires_in)
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, expires_in: data.expires_in, rotated: newToken !== token }),
    }
  } catch (e) {
    return { statusCode: 502, body: `${e} Refresh failed` }
  }
}
