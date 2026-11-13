# Proposal

## Why

The service form already supports multiple photos and a carousel, but the current large action buttons are always visible and there is no way to remove the active image. This makes creation and editing feel cluttered and prevents a clear, safe workflow for managing the current image.

## What Changes

- Replace the always-visible photo action buttons with a three-dot contextual menu above the rendered image.
- Add menu actions for making the current image the avatar, adding photos, and deleting the current image.
- Confirm image deletion in the existing modal pattern with `Да` and `Нет` actions.
- Show a shared-style toast after successfully making an image the avatar.
- Reuse the existing hidden file input for adding photos and preserve the current multi-image carousel behavior.
- Keep the existing image validation, replacement behavior, keyboard focus, reduced-motion support, and form callback contract.
- Out of scope: backend API changes, new image formats, persistent toast infrastructure, and changes to service upload payloads.

## Capabilities

### New Capabilities

- `service-photo-management`: Manage a service photo gallery through contextual actions, including avatar selection, adding photos, deletion confirmation, and feedback.

### Modified Capabilities

<!-- None. The repository has no existing capability specs for service photo management. -->

## Impact

- Frontend: `ServicePhotoField`, its CSS Module, shared toast UI, and existing modal usage.
- No new dependency and no backend changes.
- Existing `ServicePhotosValue` remains the source of truth for the parent form.
