import { useEffect } from 'react'
import { scrubCurrentUrl } from '../../lib/privacy/url-hygiene'

/**
 * Strips undeclared query parameters from the address bar on load.
 *
 * Renders nothing and must stay the FIRST child of _app: sibling effects fire in
 * tree order, which is what puts this ahead of the analytics island. See
 * lib/privacy/url-hygiene.ts for why the ordering is load-bearing.
 */
export default function UrlHygiene() {
  useEffect(() => {
    scrubCurrentUrl()
  }, [])
  return null
}
