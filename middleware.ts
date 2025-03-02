export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/issues',
    '/users',
    '/issues/newIssue',
    '/issues/editIssue/:id+',
  ]
}
