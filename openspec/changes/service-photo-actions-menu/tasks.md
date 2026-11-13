# Tasks

## 1. Photo action state and gallery behavior

- [x] 1.1 Add contextual menu, active-image deletion confirmation, and avatar-selection state to `ServicePhotoField`; verify the existing `ServicePhotosValue` callback receives correct photos and avatar URL after add, avatar, delete-confirm, delete-cancel, and final-delete flows.
- [x] 1.2 Change file selection from replacement-only behavior to append behavior for the Add photos action while preserving PNG/JPEG/WebP and 5 MB validation; verify multiple selected files remain navigable in the carousel.
- [x] 1.3 Replace persistent photo action buttons with the three-dot menu and preserve keyboard focus, Escape handling, click-outside handling, and reduced-motion behavior; verify the form remains usable with keyboard navigation.

## 2. Shared feedback and visual treatment

- [x] 2.1 Add the shared toast component and CSS Module using existing color tokens, dark surfaces, accent color, and accessible status semantics; verify the toast appears after changing the avatar and cleans up its timeout on unmount.
- [x] 2.2 Use the existing `Modal` for the `Да`/`Нет` deletion confirmation and style the contextual menu, toast, and confirmation content with CSS Modules; verify no new dependency is required and focus returns correctly after closing the modal.

## 3. Verification

- [x] 3.1 Run `npm run build` and verify the service creation and edit form renders without TypeScript or Vite errors.
- [ ] 3.2 Manually exercise the gallery in the local mock mode: add several photos, navigate them, set an avatar, cancel and confirm deletion, delete the final photo, and verify the empty state and toast behavior.

