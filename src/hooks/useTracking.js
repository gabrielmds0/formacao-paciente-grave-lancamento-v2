// src/hooks/useTracking.js

const UTM_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_content', 'utm_term', 'gclid', 'fbclid'
];

export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);

  UTM_PARAMS.forEach(param => {
    const value = params.get(param);
    if (value) {
      sessionStorage.setItem(param, value);
    }
  });

  if (!sessionStorage.getItem('session_id')) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }

  const visitCount = parseInt(localStorage.getItem('visit_count') || '0', 10) + 1;
  localStorage.setItem('visit_count', visitCount.toString());
}

export function saveFormData(data) {
  if (data.name) sessionStorage.setItem('name', data.name);
  if (data.email) sessionStorage.setItem('email', data.email);
  if (data.phone) sessionStorage.setItem('phone', data.phone);
}

export function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

export function getCaptureData(pageLoadTime = Date.now(), modalOpenTime = null) {
  const urlParams = new URLSearchParams(window.location.search);
  const now = Date.now();
  const currentDate = new Date();

  const timeOnSite = Math.round((now - pageLoadTime) / 1000);
  const formFillTime = modalOpenTime ? Math.round((now - modalOpenTime) / 1000) : 0;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const hour = currentDate.getHours();
  let timeOfDay = 'morning';
  if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
  else if (hour >= 18 && hour < 24) timeOfDay = 'evening';
  else if (hour >= 0 && hour < 6) timeOfDay = 'night';

  return {
    utm_source: urlParams.get('utm_source') || sessionStorage.getItem('utm_source') || 'direct',
    utm_medium: urlParams.get('utm_medium') || sessionStorage.getItem('utm_medium') || 'direct',
    utm_campaign: urlParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign') || 'none',
    utm_content: urlParams.get('utm_content') || sessionStorage.getItem('utm_content') || null,
    utm_term: urlParams.get('utm_term') || sessionStorage.getItem('utm_term') || null,
    fbclid: urlParams.get('fbclid') || sessionStorage.getItem('fbclid') || null,
    gclid: urlParams.get('gclid') || sessionStorage.getItem('gclid') || null,
    page_path: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer || 'direct',
    page_url: window.location.href,
    device_type: getDeviceType(),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    browser_language: navigator.language || navigator.userLanguage,
    user_agent: navigator.userAgent,
    session_timestamp: new Date().toISOString(),
    time_on_site_seconds: timeOnSite,
    form_fill_time_seconds: formFillTime,
    day_of_week: dayOfWeek,
    time_of_day: timeOfDay,
    hour_of_day: hour,
    session_id: sessionStorage.getItem('session_id'),
    visit_count: parseInt(localStorage.getItem('visit_count') || '1', 10),
    is_returning_visitor: parseInt(localStorage.getItem('visit_count') || '1', 10) > 1,
  };
}

export function buildTrackedUrl(baseUrl) {
  if (!baseUrl) return null;

  try {
    const url = new URL(baseUrl);

    [...UTM_PARAMS, 'session_id', 'name', 'email', 'phone'].forEach(key => {
      const value = sessionStorage.getItem(key);
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  } catch (e) {
    console.error('Erro ao construir URL:', e);
    return baseUrl;
  }
}
