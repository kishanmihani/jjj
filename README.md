# Frontdesk visitor management

An Angular visitor registration wizard and status board styled with Tailwind CSS and the locally bundled Poppins font.

## Run locally

```sh
npm install
npm start
```

## Source layout

- `src/app/pages/` contains the page-level state and coordinates registration and visit transitions.
- `src/app/components/visitor/` contains the registration wizard, host picker, and visitor board.
- `src/app/components/common/` contains reusable header, step indicator, review section, and status chip UI.
- `src/app/utils/` contains host/purpose data, validation, transition rules, and formatting helpers.

Visitor state remains in memory. The board actions allow only `PENDING → APPROVED/DENIED → CHECKED_IN → CHECKED_OUT`.
