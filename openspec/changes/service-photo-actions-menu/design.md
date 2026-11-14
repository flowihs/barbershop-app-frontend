# Design

## Context

The existing `ServicePhotoField` owns the in-memory gallery, object URL lifecycle, carousel navigation, file validation, and `ServicePhotosValue` callback. The app already has an accessible portal-based `Modal` with focus handling and CSS Modules using `--color-*` tokens. See `proposal.md` for motivation and `specs/service-photo-management/spec.md` for behavior.

## Goals / Non-Goals

**Goals:**

- Keep gallery state and file input ownership inside `ServicePhotoField`.
- Replace the two persistent image action buttons with a compact contextual menu.
- Reuse `Modal` for deletion confirmation and add one shared, non-blocking toast component.
- Preserve existing carousel, validation, object URL cleanup, reduced-motion, and parent callback behavior.

**Non-Goals:**

- No backend contract or upload API changes.
- No new dependency or global toast store.
- No booking flow changes.

## Decisions

- Add a small local menu state to `ServicePhotoField`; render it anchored above the image using the existing gallery section positioning and CSS tokens. Close it on action selection, Escape, and outside pointer interaction.
- Keep `inputRef` and `handleFiles` as the single file-selection path. The Add photos menu item calls the existing picker, while the handler appends files when a gallery already exists instead of replacing the active image.
- Use the existing `Modal` with a short confirmation body and explicit `Да`/`Нет` buttons. Deletion updates photos and avatar in one state transition, then invokes `onChange` once.
- Add `src/shared/ui/Toast/Toast.tsx` and a CSS Module for a local status toast. `ServicePhotoField` owns only its visible/timeout state so no provider or global store is introduced.
- Use `MoreHorizontal`, `Camera`, and `Trash2` from the installed `lucide-react` dependency. Keep labels in Russian to match the requested UI copy and existing form language.

## Risks / Trade-offs

- [Risk] A gallery can be emptied by deleting its final image → [Mitigation] require the existing confirmation modal and restore the empty Add photo state with a cleared avatar.
- [Risk] A toast timeout can update after unmount → [Mitigation] clear its timer in the toast effect cleanup.
- [Risk] Outside-click handling can close the menu before an item action → [Mitigation] use a menu ref and ignore pointer events inside the menu.

## Migration Plan

No data migration. Existing callers continue to receive the same `ServicePhotosValue` shape. Roll back by reverting the `ServicePhotoField`, toast, and style changes.
