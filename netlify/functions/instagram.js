/* eslint-disable no-undef */
import { getStore } from '@netlify/blobs'

export async function handler(event) {
  try {
    const store = getStore('secrets')
    let token = await store.get('ig_token')
    if (!token) {
      token = process.env.IG_TOKEN
      if (token) await store.set('ig_token', token)
    }
    if (!token) {
      return { statusCode: 500, body: JSON.stringify({ error: 'IG token missing' }) }
    }

    const url = new URL(event.rawUrl)
    const limit = url.searchParams.get('limit') || '3'
    const fields =
      process.env.IG_FIELDS ||
      'id,media_type,media_url,permalink,thumbnail_url,caption,timestamp'

    const api = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=${limit}`
    const r = await fetch(api)
    const data = await r.json()
    if (!r.ok) {
      return { statusCode: r.status, body: JSON.stringify(data) }
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' },
      body: JSON.stringify({ items: data.data || [] }),
    }
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: `${err} Instagram fetch failed` }) }
  }
}
