const GOOGLE_ANALYTICS_ID = 'G-9KS3R2F2WG';
const META_PIXEL_ID = '1064327147462690';
const CLARITY_ID = 'rjlmen2mzl';
const NEMU_TRACKING_ID = 'OxVyKz8wj1';
const CONTENTSQUARE_URL = 'https://t.contentsquare.net/uxa/89e8860f4d474.js';
const PAGEVIEW_WEBHOOK_URL = 'https://projetolm-n8n.8x0hqh.easypanel.host/webhook/pageview';

function injectScript(src, attributes = {}) {
  const existingScript = document.querySelector(`script[src="${src}"]`);

  if (existingScript) {
    return existingScript;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === true) {
      script.setAttribute(key, '');
      return;
    }

    if (value !== false && value != null) {
      script.setAttribute(key, String(value));
    }
  });

  document.head.appendChild(script);
  return script;
}

function initializeGoogleAnalytics() {
  if (window.__fpgGaInitialized) {
    return;
  }

  window.__fpgGaInitialized = true;

  import('react-ga4')
    .then(({ default: ReactGA }) => {
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
      ReactGA.send({
        hitType: 'pageview',
        page: `${window.location.pathname}${window.location.search}`,
        title: document.title,
      });
    })
    .catch(() => {});
}

function initializeClarity() {
  if (window.clarity) {
    return;
  }

  window.clarity = function clarityProxy(...args) {
    (window.clarity.q = window.clarity.q || []).push(args);
  };

  injectScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
}

function initializeNemu() {
  injectScript(
    `https://trackings.nemu.com.br/trackings/${NEMU_TRACKING_ID}/script.js`,
    {
      'data-tracking-id': NEMU_TRACKING_ID,
      crossorigin: 'anonymous',
    },
  );
}

function initializeContentsquare() {
  injectScript(CONTENTSQUARE_URL);
}

function initializeMetaPixel() {
  if (window.fbq) {
    return;
  }

  const fbq = function fbqProxy(...args) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
      return;
    }

    fbq.queue.push(args);
  };

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';

  window.fbq = fbq;
  window._fbq = fbq;

  injectScript('https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
  };
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 15)}`;
}

function getFbp() {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('_fbp='));

  if (cookieValue) {
    return cookieValue.split('=')[1];
  }

  const fbp = `fb.1.${Date.now()}.${Math.random().toString().slice(2, 11)}`;
  document.cookie = `_fbp=${fbp}; path=/; max-age=${365 * 24 * 60 * 60}`;
  return fbp;
}

function getFbc() {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');

  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${fbc}; path=/; max-age=${365 * 24 * 60 * 60}`;
    return fbc;
  }

  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('_fbc='));

  return cookieValue ? cookieValue.split('=')[1] : '';
}

function sendPageview() {
  if (window.__fpgPageviewSent) {
    return;
  }

  window.__fpgPageviewSent = true;

  const timestamp = Math.floor(Date.now() / 1000);
  const sessionId = sessionStorage.getItem('session_id') || generateId();

  if (!sessionStorage.getItem('session_id')) {
    sessionStorage.setItem('session_id', sessionId);
  }

  const payload = {
    url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer || '',
    ip: localStorage.getItem('client_ip') || '',
    ua: navigator.userAgent,
    timestamp,
    session_id: sessionId,
    fbp: getFbp(),
    fbc: getFbc(),
    ...getUtmParams(),
    language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    domain: window.location.hostname,
    timestamp_br: new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const requestBody = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(PAGEVIEW_WEBHOOK_URL, requestBody);
    return;
  }

  fetch(PAGEVIEW_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    mode: 'cors',
    keepalive: true,
  }).catch(() => {});
}

export function initializeDeferredTracking() {
  if (window.__fpgDeferredTrackingInitialized) {
    return;
  }

  window.__fpgDeferredTrackingInitialized = true;

  initializeGoogleAnalytics();
  initializeClarity();
  initializeNemu();
  initializeContentsquare();
  initializeMetaPixel();
  window.setTimeout(sendPageview, 500);
}
