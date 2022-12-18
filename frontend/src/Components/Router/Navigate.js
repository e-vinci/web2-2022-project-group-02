/**
 * Navigate to a URI by triggering the popstate event in order for the router to deal with
 * a change of browser history.
 * NB : this solution is to avoid circular depedencies : if Navigate() had to import, directly or
 * indirectly, the pages, then there would be a circular reference because the router
 * has to import all the pages to render them.
 */

import { usePathPrefix } from '../../utils/path-prefix';

const Navigate = (_toUri) => {
  const fromUri = window.location.pathname.replace(process.env.PATH_PREFIX, '/');
  if (fromUri === _toUri) return;

  let toUri = _toUri;

  if (toUri.match(/^(\/login|\/register|\/logout)$/)) {
    // if toUri contains a query string, we need to append the location to the query string
    // otherwise, we can just append the location to the URI
    const [uri, queryString] = toUri.split('?');
    toUri = `${uri}?${queryString ? `${queryString}&` : ''}location=${encodeURIComponent(
      fromUri + window.location.search,
    )}`;
  }

  window.history.pushState({}, '', usePathPrefix(toUri));
  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
};

export default Navigate;
