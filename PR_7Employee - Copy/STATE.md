# Project State

## Current State
- `App.jsx` and `EmployeeCard.jsx` refactoring is fully complete.
- Implemented sorting and filtering strictly using ES6 `Set` methods. No array `filter` methods are used throughout the application. 
- Integrated custom `getIntersection` util to perform correct set-based operations across different conditions (e.g. category matching and minimum values).
- Replaced the inline mapped Employee/Product cards into a distinct `EmployeeCard.jsx` module. 

## Recent Changes
- Created component `EmployeeCard.jsx` and extracted the card display logic from `App.jsx`.
- Removed mapping logic using the inner inline mapped code, substituting it with the newly created component import.
- Inserted custom sorting controls utilizing purely Set functionality simulating `selection sort` algorithms rather than `Array.prototype.sort()`.
- Added support for a `quantity` field to correspond with standard eCommerce applications behavior sorting constraints specified by the user.

## Next Phase
- Verify data interactions when state becomes large or populated manually via UI.
