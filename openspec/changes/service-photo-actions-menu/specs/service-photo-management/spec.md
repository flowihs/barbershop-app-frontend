# Spec Delta

## Purpose

Provide a focused, accessible photo-management workflow for service creation and editing so users can manage a gallery, choose its avatar, add files, and remove the active image without leaving the form.

## ADDED Requirements

### Requirement: Contextual photo actions
The service photo area SHALL expose a three-dot actions control when an image is rendered, and the control SHALL offer making the active image the avatar, adding photos, and deleting the active image.

#### Scenario: Open photo actions
- **WHEN** the user activates the three-dot control above a rendered image
- **THEN** the contextual menu opens with the three requested actions and matches the surrounding dark, accent-colored interface

#### Scenario: Close photo actions
- **WHEN** the user selects an action, presses Escape, or activates the control again
- **THEN** the contextual menu closes

### Requirement: Add photos
The service photo area SHALL reuse the existing file picker to add one or more valid PNG, JPEG, or WebP images, preserving the current file-size validation and carousel behavior.

#### Scenario: Add valid photos
- **WHEN** the user selects valid image files from the Add photos action
- **THEN** the files are appended to the gallery, the selected gallery value is reported to the parent form, and the newly available images can be viewed

#### Scenario: Reject invalid photos
- **WHEN** a selected file has an unsupported type or exceeds 5 MB
- **THEN** no invalid file is added and the existing inline error is shown

### Requirement: Set the active avatar
The service photo area SHALL allow the active rendered image to become the avatar and SHALL report the changed avatar URL to the parent form.

#### Scenario: Set active image as avatar
- **WHEN** the user chooses Make avatar for an image that is not currently the avatar
- **THEN** that image is marked as the avatar, the menu closes, and a toast confirms the change

#### Scenario: Avatar action is already selected
- **WHEN** the active image is already the avatar
- **THEN** the Make avatar action is disabled or unavailable and no duplicate toast is shown

### Requirement: Confirm photo deletion
Deleting an image SHALL require confirmation and SHALL preserve gallery validity by selecting a remaining image as the avatar when the current avatar is removed.

#### Scenario: Confirm deletion
- **WHEN** the user chooses Delete image and confirms `Да`
- **THEN** the active image is removed, the next valid image is selected when one remains, the parent form receives the updated gallery, and the menu and confirmation modal close

#### Scenario: Cancel deletion
- **WHEN** the user chooses Delete image and then selects `Нет` or closes the modal
- **THEN** the gallery remains unchanged

#### Scenario: Delete the final image
- **WHEN** the user confirms deletion while only one image remains
- **THEN** the gallery becomes empty, its avatar URL is cleared, and the existing Add photo empty state is shown

### Requirement: Feedback and accessibility
The photo actions, confirmation modal, and avatar toast SHALL be keyboard reachable, expose meaningful accessible names, and respect the existing reduced-motion behavior.

#### Scenario: Keyboard interaction
- **WHEN** the user navigates the actions menu and confirmation controls with a keyboard
- **THEN** focus remains visible, Escape closes transient UI, and the modal uses the existing focus management behavior

#### Scenario: Avatar toast
- **WHEN** an avatar change succeeds
- **THEN** a shared toast appears with an accessible status message and disappears without blocking further form interaction
