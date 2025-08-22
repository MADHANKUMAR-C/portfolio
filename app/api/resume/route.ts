const base64MinimalPdf =
  "JVBERi0xLjQKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvVH" +
  "lwZSAvUGFnZXMvS2lkcyBbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlIC9QYWdlL1BhcmVudCAyIDAgUi9NZWRpYUJveCBbMCAwIDU5NSA4NDJdL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSPj4+Pi9Db250ZW50cyA1IDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L1R5cGUgL0ZvbnQvU3VidHlwZSAvVHlwZTEvTmFtZSAvRjEvQmFzZUZvbnQgL0hlbHZldGljYT4+CmVuZG9iago1IDAgb2JqCjw8L0xlbmd0aCAxMjU+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3ODAgVGQKKC9SZXN1bWUgLSBNYWRoYW4gS3VtYXIpIFRqCjEwMCA3NjAgVGQKKFN1YnN0aXR1dGUgUG9ydGZvbGlvIFBERiBwbGFjZWhvbGRlcikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8L1Byb2R1Y2VyIChWMCBSZXN1bWUpL1RpdGxlIChNYWRoYW4gS3VtYXIgUmVzdW1lKT4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA5NjUgMDAwMDAgbiAKMDAwMDAwMDE1NiAwMDAwMCBuIAowMDAwMDAwMjM4IDAwMDAwIG4gCjAwMDAwMDAzNTEgMDAwMDAgbiAKMDAwMDAwMDQwNSAwMDAwMCBuIAowMDAwMDAwNjM2IDAwMDAwIG4gCnRyYWlsZXIKPDwvUm9vdCAxIDAgUi9JRCBbPGQxYmQxYjZjOTg3N2E4NmU+IDxkMWJkMWI2Yzk4NzdhODZlPl0+PgpzdGFydHhyZWYKNjgyCiUlRU9G"

export async function GET() {
  const bytes = Buffer.from(base64MinimalPdf, "base64")
  return new Response(bytes, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": "attachment; filename=madhan-kumar-resume.pdf",
      "cache-control": "public, max-age=600",
    },
  })
}
