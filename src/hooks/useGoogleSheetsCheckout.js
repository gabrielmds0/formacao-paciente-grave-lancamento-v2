import { useState, useEffect } from 'react';

const SPREADSHEET_ID = '1MCmHqHMDHV4RT1EFL8LLaLeqnpKCWGVvwiCmBA9WVhs';
const SHEET_GID = '1674750967';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const FALLBACK_CHECKOUT_URL = 'https://chat.whatsapp.com/DeOhgO2DffzIgvmMrVKDvt?mode=gi_t';
const VIP_SHEET_KEYS = ['Grupo VIP', 'GrupoVIP', 'VIP'];

function parseCSV(csvText) {
  const result = {};

  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');

  for (const line of lines) {
    const match = line.match(/^"?([^",]*)"?,\s*"?([^"]*)"?/);

    if (match && match[1] && match[2]) {
      const key = match[1].trim();
      const value = match[2].trim();

      if (key && value && !key.toLowerCase().includes('preencher')) {
        result[key] = value;
      }
    }
  }

  return result;
}

function isValidHttpUrl(value) {
  return typeof value === 'string' && value.startsWith('http');
}

function getVipUrlFromSheet(parsedData) {
  for (const key of VIP_SHEET_KEYS) {
    const value = parsedData[key];
    if (isValidHttpUrl(value)) {
      return value;
    }
  }
  return null;
}

export function useGoogleSheetsCheckout() {
  const [checkoutUrl, setCheckoutUrl] = useState(FALLBACK_CHECKOUT_URL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();

        if (!csvText || csvText.length === 0) {
          setCheckoutUrl(FALLBACK_CHECKOUT_URL);
          setLoading(false);
          return;
        }

        const parsedData = parseCSV(csvText);

        const vipUrlFromSheet = getVipUrlFromSheet(parsedData);
        setCheckoutUrl(vipUrlFromSheet || FALLBACK_CHECKOUT_URL);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching checkout URL:', err);
        setError('Failed to fetch checkout URL');
        setCheckoutUrl(FALLBACK_CHECKOUT_URL);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { checkoutUrl, loading, error };
}

export default useGoogleSheetsCheckout;
