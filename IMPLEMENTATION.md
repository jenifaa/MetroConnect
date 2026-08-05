# MetroConnect Frontend Implementation Guide

This document converts the approved MetroConnect proposal into a practical React frontend plan. It is intentionally frontend-focused; backend endpoints below are the integration target, not a claim that they already exist.

## 1. Frontend Goals

The interface must let students discover useful campus information quickly, take actions with minimal friction, and understand the result of those actions. It must work well on mobile and desktop, protect authenticated views, and keep anonymous complaints visually and technically separate from public activity.

## 2. User Roles

| Role | Frontend capabilities |
| --- | --- |
| Guest | View public landing content; register and log in. |
| Student | Create and manage posts, questions, comments, listings, and complaints; read announcements; update profile. |
| Admin | Use dashboard views to moderate content, manage users and complaints, and publish announcements. |

The server remains the source of truth for role authorization. The frontend should hide unavailable navigation and redirect unauthorized users, but must not rely on client checks for security.

## 3. Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Landing page, recent announcements, and feature links | Public |
| `/login`, `/register` | Authentication forms | Public only |
| `/feed` | Community post feed with category and search filters | Student |
| `/posts/new`, `/posts/:postId`, `/posts/:postId/edit` | Create, read, and edit a discussion post | Student / owner for edit |
| `/questions`, `/questions/new`, `/questions/:questionId` | Q&A list, form, and details | Student |
| `/lost-found`, `/lost-found/new`, `/lost-found/:itemId` | Lost-and-found list, form, and details | Student |
| `/complaints`, `/complaints/new`, `/complaints/:complaintId` | Complaint history, form, and tracking | Student |
| `/announcements`, `/announcements/:announcementId` | Official notices | Student |
| `/notifications` | User notification center | Student |
| `/profile`, `/profile/:userId` | Current-user settings and student profile | Student |
| `/admin` | Dashboard overview | Admin |
| `/admin/users`, `/admin/posts`, `/admin/complaints`, `/admin/announcements` | Management views | Admin |
| `*` | Not-found page | Public |

Use `CommonLayout` for public and student pages and `DashboardLayout` for administration. Add `ProtectedRoute` and `AdminRoute` wrappers before building protected screens.

## 4. Page and Component Plan

### Shared components

- `Navbar`: logo, primary navigation, notification icon, profile menu, login state, and mobile menu.
- `Footer`: campus links, usage guidance, and project attribution.
- `PageHeader`, `EmptyState`, `LoadingState`, `ErrorState`, `ConfirmDialog`, and `Pagination`.
- `SearchFilterBar`: shared keyword, category, status, and sort controls.
- `ImageUploader`: previews local images and passes `multipart/form-data` to the API.

### Community and Q&A

- `PostCard`, `PostForm`, `PostDetail`, `CommentThread`, `CommentForm`, and `InteractionBar`.
- `QuestionCard`, `QuestionForm`, `AnswerList`, and `AnswerForm`.
- Support edit/delete buttons only when the current user owns the resource; show report controls for eligible content.

### Campus services

- `LostFoundCard` and `LostFoundForm` with item type, location, date, description, image, and resolved status.
- `ComplaintForm` with category, description, optional attachment, anonymous toggle, and a clear privacy message.
- `ComplaintStatusBadge` for Submitted, Under Review, Resolved, and Rejected states.
- `AnnouncementCard` and `AnnouncementDetail` with publication date and admin identity.

### Administration

- Dashboard summary cards for pending complaints, reports, users, and announcements.
- Data tables with filters, pagination, status updates, and confirm dialogs for destructive actions.
- An announcement editor with title, body, attachment/image, and publish controls.

## 5. State and API Integration

Create these modules as the app grows:

```text
src/
├── api/              # authApi, postsApi, complaintsApi, etc.
├── context/          # AuthContext and NotificationContext
├── hooks/            # useAuth, useDebounce, usePagination
├── components/
│   ├── common/
│   ├── posts/
│   ├── questions/
│   ├── complaints/
│   ├── lostFound/
│   └── admin/
└── pages/
    ├── Auth/
    ├── Community/
    ├── Questions/
    ├── Complaints/
    ├── LostFound/
    ├── Announcements/
    └── Admin/
```

Configure one Axios instance in `src/lib/axios.js` with `VITE_API_BASE_URL`. Attach the JWT access token on every authenticated request. A response interceptor should clear expired credentials, show a useful message, and send the user to `/login`.

Keep the signed-in user and token in an `AuthContext`. Prefer `sessionStorage` for the token during the course project unless the backend provides secure, HTTP-only cookie authentication. Never place passwords, secret keys, or Cloudinary credentials in frontend environment variables.

## 6. Proposed REST API Contract

| Area | Required endpoints |
| --- | --- |
| Authentication | `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `PATCH /auth/me` |
| Posts | `GET/POST /posts`, `GET/PATCH/DELETE /posts/:id`, `POST /posts/:id/comments`, `POST /posts/:id/like`, `POST /posts/:id/report` |
| Questions | `GET/POST /questions`, `GET/PATCH/DELETE /questions/:id`, `POST /questions/:id/answers`, `POST /answers/:id/upvote` |
| Lost & found | `GET/POST /lost-found`, `GET/PATCH/DELETE /lost-found/:id` |
| Complaints | `GET/POST /complaints`, `GET /complaints/:id`, `PATCH /complaints/:id/status` (admin) |
| Announcements | `GET /announcements`, `POST/PATCH/DELETE /announcements/:id` (admin) |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read` |
| Administration | `GET /admin/dashboard`, `GET/PATCH /admin/users`, moderation endpoints for posts and reports |

List responses should support `page`, `limit`, `search`, `category`, `status`, and `sort` query parameters where appropriate. Standardize API errors as `{ message, errors? }` so forms can display field-level feedback.

## 7. Form and UX Requirements

- Validate required fields before sending requests; show inline errors and disable submit buttons while saving.
- Use toast feedback for successful saves, failed requests, and moderation actions.
- Show skeletons or loading states for remote content, empty states for no data, and retry controls after errors.
- Make every interactive control keyboard accessible with visible focus styles and meaningful labels.
- Build mobile-first: a stacked feed and filter drawer on small screens, expanding to sidebars/tables on larger screens.
- Confirm deletes and moderation actions. Optimistically update only low-risk actions such as likes, with rollback on failure.

For anonymous complaints, never show the reporter's name, avatar, student ID, or profile link in the student-facing complaint record. The frontend should tell users what “anonymous” means before submission; the backend must enforce the actual confidentiality policy.

## 8. Implementation Order

1. Establish layouts, design tokens, router, 404 page, and responsive navigation.
2. Implement `AuthContext`, login/register, route guards, and profile settings.
3. Build the announcement list and community feed with reusable cards, filters, loading, and empty states.
4. Add post details, comments, and author-owned edit/delete flows.
5. Add Q&A and lost-and-found modules using the same list/detail/form pattern.
6. Build the complaint form and tracking page, including anonymous mode and clear status badges.
7. Add notifications, bookmarks, reporting, and image uploads if time allows.
8. Create admin dashboard and management pages after the student data flows are stable.
9. Perform responsive, accessibility, route-guard, and API-error testing before deployment.

## 9. Quality Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` succeeds.
- [ ] Every protected route redirects unauthenticated visitors to login.
- [ ] Admin-only routes reject student accounts in the UI and backend.
- [ ] Forms show loading, success, validation, and server-error feedback.
- [ ] Pages work at mobile, tablet, and desktop widths.
- [ ] Anonymous complaint views contain no accidental identity fields.
- [ ] No secrets appear in source code, commits, or `VITE_*` variables.
- [ ] Production API URL is set in the Vercel environment before deployment.
