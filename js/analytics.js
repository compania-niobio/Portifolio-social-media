// Vercel Web Analytics initialization
// This script injects the Vercel Analytics tracking code

(function() {
  // Initialize the analytics queue
  function initQueue() {
    if (window.va) return;
    window.va = function a() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }

  // Detect environment
  function detectEnvironment() {
    try {
      const env = typeof process !== 'undefined' ? process.env.NODE_ENV : undefined;
      if (env === 'development' || env === 'test') {
        return 'development';
      }
    } catch (e) {
      // Ignore error
    }
    return 'production';
  }

  // Set mode
  function setMode(mode) {
    if (mode === 'auto') {
      window.vam = detectEnvironment();
      return;
    }
    window.vam = mode;
  }

  // Get mode
  function getMode() {
    return window.vam || 'production';
  }

  // Check if development mode
  function isDevelopment() {
    return getMode() === 'development';
  }

  // Get script source
  function getScriptSrc() {
    if (isDevelopment()) {
      return 'https://va.vercel-scripts.com/v1/script.debug.js';
    }
    return '/_vercel/insights/script.js';
  }

  // Inject the analytics script
  function inject(props) {
    props = props || { debug: true };
    
    setMode(props.mode || 'auto');
    initQueue();

    const src = getScriptSrc();
    
    // Check if script already exists
    if (document.head.querySelector(`script[src*="${src}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = '@vercel/analytics';
    script.dataset.sdkv = '1.6.1';

    script.onerror = function() {
      const errorMessage = isDevelopment() 
        ? 'Please check if any ad blockers are enabled and try again.'
        : 'Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.';
      
      console.log(
        `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
      );
    };

    if (isDevelopment() && props.debug === false) {
      script.dataset.debug = 'false';
    }

    document.head.appendChild(script);
  }

  // Initialize analytics when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      inject({ mode: 'auto', debug: true });
    });
  } else {
    inject({ mode: 'auto', debug: true });
  }
})();
