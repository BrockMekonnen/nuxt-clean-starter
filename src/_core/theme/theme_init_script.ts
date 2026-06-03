import { THEME_COOKIE_NAME, THEME_STORAGE_KEY } from './constants'

/**
 * Runs synchronously in <head> before first paint. Reads the saved theme from
 * localStorage (then cookie, then system preference) and sets `data-theme` on
 * <html> so CSS tokens match the user's choice immediately — no dark flash
 * when the app is set to light while the OS is dark.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)},c=${JSON.stringify(THEME_COOKIE_NAME)},t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){var m=document.cookie.match(new RegExp('(?:^|; )'+c+'=([^;]*)'));t=m?decodeURIComponent(m[1]):null}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}})();`
