# Frontdesk visitor management

A React visitor registration wizard and status board styled with Tailwind CSS and the locally bundled Poppins font.

## Run locally

```sh
npm install
npm run dev
```

## Source layout

- `src/pages/` contains the page-level state and coordinates registration and visit transitions.
- `src/components/visitor/` contains the registration wizard, host picker, and visitor board.
- `src/components/common/` contains reusable header, step indicator, review section, and status chip UI.
- `src/utils/` contains host/purpose data, validation, transition rules, and formatting helpers.

Visitor state remains in memory. The board actions allow only `PENDING → APPROVED/DENIED → CHECKED_IN → CHECKED_OUT`.
