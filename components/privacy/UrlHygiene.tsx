import { useEffect } from 'react'
import { installUrlGuard, enforceCurrentUrl } from '../../lib/privacy/url-guard'

/**
 * Renders nothing. The real work happens at MODULE SCOPE (below), not in the
 * effect: module evaluation runs before hydration, before Next's router
 * initialises and before next/script injects the analytics bundle, which is
 * what puts the guard structurally ahead of every URL writer instead of racing
 * one of them.
 *
 * The effect is a belt-and-braces re-assertion for the mounted document. It is
 * idempotent and writes no history when the URL is already in policy.
 */
if (typeof window !== 'undefined') {
  installUrlGuard()
}

export default function UrlHygiene() {
  useEffect(() => {
    enforceCurrentUrl()
  }, [])
  return null
}
