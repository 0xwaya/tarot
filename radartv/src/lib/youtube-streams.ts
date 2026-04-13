export type StreamItem = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

const STREAMS_URL = 'https://www.youtube.com/@deibisromerolocutor/streams';
const WATCH_URL = 'https://www.youtube.com/watch?v=';

const FALLBACK_STREAMS: StreamItem[] = [
  {
    id: 'canal-streams',
    title: 'Ver todos los streams en el canal oficial',
    url: STREAMS_URL,
    thumbnail: 'https://i.ytimg.com/vi_webp/live/default.webp',
  },
  {
    id: 'canal-home',
    title: 'Canal de Deibis Romero en YouTube',
    url: 'https://www.youtube.com/@deibisromerolocutor',
    thumbnail: 'https://i.ytimg.com/vi_webp/default/default.webp',
  },
];

function decodeTitle(value: string) {
  return value
    .replace(/\\u0026/g, '&')
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>')
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .trim();
}

export async function getTopStreams(limit = 6): Promise<StreamItem[]> {
  try {
    const response = await fetch(STREAMS_URL, {
      next: { revalidate: 1800 },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return FALLBACK_STREAMS;
    }

    const html = await response.text();
    const regex = /"videoId":"([a-zA-Z0-9_-]{11})"[\s\S]*?"title":\{"runs":\[\{"text":"([^"]+)"/g;

    const seen = new Set<string>();
    const items: StreamItem[] = [];

    for (const match of html.matchAll(regex)) {
      const [, videoId, rawTitle] = match;
      if (seen.has(videoId)) {
        continue;
      }
      seen.add(videoId);

      items.push({
        id: videoId,
        title: decodeTitle(rawTitle),
        url: `${WATCH_URL}${videoId}`,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      });

      if (items.length >= limit) {
        break;
      }
    }

    return items.length > 0 ? items : FALLBACK_STREAMS;
  } catch {
    return FALLBACK_STREAMS;
  }
}
