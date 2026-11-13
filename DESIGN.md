# Design notes

## Scope

Private page notes, opened only when you ask for them.

## Implementation decisions

Notes are keyed by origin and pathname, excluding query strings and fragments. Storage uses Tampermonkey’s isolated value APIs. UI content is constructed with DOM text nodes inside a shadow root.

## Boundaries

Pages sharing a path but differing only by query or fragment share a note. Notes stay in the userscript manager and do not sync through this app. Stored notes are not encrypted. Opening a page or navigation can still trigger the original website’s own network requests.

## Verification

Pure functions are tested with the Node built-in test runner; the drawer is checked in a simulated userscript browser environment.

Tests describe expected behavior rather than depending on a live external service. CI configuration is included, but remote CI execution is not implied by local test results.
