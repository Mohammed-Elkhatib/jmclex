// Debug mode utility for form development
const DEBUG_MODE = true;

export const debugLog = {
  info: (label: string, data?: any) => {
    if (DEBUG_MODE) {
      console.log(`[DEBUG] ${label}`, data || '');
    }
  },
  error: (label: string, error?: any) => {
    if (DEBUG_MODE) {
      console.error(`[DEBUG ERROR] ${label}`, error || '');
    }
  },
  warn: (label: string, data?: any) => {
    if (DEBUG_MODE) {
      console.warn(`[DEBUG WARN] ${label}`, data || '');
    }
  },
  validation: (fieldName: string, isValid: boolean, error?: string) => {
    if (DEBUG_MODE) {
      console.log(`[VALIDATION] ${fieldName}: ${isValid ? '✓' : '✗'}`, error || '');
    }
  },
  upload: (fileName: string, status: string, details?: any) => {
    if (DEBUG_MODE) {
      console.log(`[UPLOAD] ${fileName} - ${status}`, details || '');
    }
  },
  cmsResponse: (operation: string, result: any) => {
    if (DEBUG_MODE) {
      console.log(`[CMS] ${operation}`, result);
    }
  },
  buttonClick: (buttonName: string, formData?: any) => {
    if (DEBUG_MODE) {
      console.log(`[BUTTON CLICK] ${buttonName}`, formData || '');
    }
  },
};

export const isDebugMode = () => DEBUG_MODE;
