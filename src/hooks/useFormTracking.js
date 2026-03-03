import { useCallback } from 'react';
import ReactGA from 'react-ga4';

export const useFormTracking = ({ formName = 'form' } = {}) => {
  const trackFormStart = useCallback((additionalData = {}) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_start',
      label: formName,
      ...additionalData,
    });
  }, [formName]);

  const trackFormValidationError = useCallback((errors = []) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_validation_error',
      label: formName,
      value: errors.length,
      error_fields: errors.join(', '),
    });
  }, [formName]);

  const trackFormDataCaptured = useCallback((data = {}) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_data_captured',
      label: formName,
      ...data,
    });
  }, [formName]);

  const trackFormSubmit = useCallback((additionalData = {}) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_submit',
      label: formName,
      form_name: formName,
      ...additionalData,
    });
  }, [formName]);

  const trackFormSuccess = useCallback((data = {}) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_success',
      label: formName,
      ...data,
    });
  }, [formName]);

  const trackFormError = useCallback((error) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_error',
      label: formName,
      error_message: error?.message || 'Unknown error',
    });
  }, [formName]);

  const trackFormRedirect = useCallback((url) => {
    ReactGA.event({
      category: 'Form',
      action: 'form_redirect',
      label: formName,
      redirect_url: url,
    });
  }, [formName]);

  return {
    trackFormStart,
    trackFormValidationError,
    trackFormDataCaptured,
    trackFormSubmit,
    trackFormSuccess,
    trackFormError,
    trackFormRedirect,
  };
};
