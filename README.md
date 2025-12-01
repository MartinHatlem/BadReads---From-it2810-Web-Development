# Documentation

## Table of contents

- [Documentation](#documentation)
  - [Table of contents](#table-of-contents)
  - [Deployment status](#deployment-status)
  - [Run application guide](#run-application-guide)
    - [1. Clone and install our project using SSH or HTTPS](#1-clone-and-install-our-project-using-ssh-or-https)
    - [2. Frontend folder](#2-frontend-folder)
    - [3. Install packages](#3-install-packages)
    - [4. Run frontend](#4-run-frontend)
  - [Run tests guide](#run-tests-guide)
    - [Running E2E test](#running-e2e-test)
    - [Running component tests](#running-component-tests)
  - [Login guide](#login-guide)
  - [The application](#the-application)
    - [Color choices](#color-choices)
    - [Choice of technology and component library](#choice-of-technology-and-component-library)
  - [Project structure](#project-structure)
    - [Frontend structure](#frontend-structure)
      - [Components](#components)
    - [Backend structure](#backend-structure)
  - [Improvements from the previous iteration](#improvements-from-the-previous-iteration)
  - [Testing](#testing)
    - [Where tests live](#where-tests-live)
    - [What we cover](#what-we-cover)
  - [Accessibility](#accessibility)
  - [Sustainability](#sustainability)
  - [Use of AI](#use-of-ai)
  - [Known issues](#known-issues)

## Deployment status

Our application is up and running on the vm with both frontend and backend at: <http://it2810-32.idi.ntnu.no/project2> and our server at: <http://it2810-32.idi.ntnu.no:7474>

If you want to run the application locally follow the guide below:

## Run application guide

### 1. Clone and install our project using SSH or HTTPS

```bash
git clone <our-repo-url>
```

### 2. Frontend folder

```bash
cd frontend
```

### 3. Install packages

```bash
npm i
```

### 4. Run frontend

```bash
npm run dev
```

## Run tests guide

Component tests focus on individual React units and accessibility, while E2E tests simulate full user flows.

### Running E2E test

Our Playwright E2E tests do not start a local dev server.
Instead, the tests run directly against our deployed application on the NTNU VM.

Make sure you're in the `frontend` folder and that dependencies are installed:

```bash
cd frontend
npm install -D @playwright/test
npx playwright install
```

You can now run the test with:

```bash
npx playwright test
# or if you want to see the test step-by-step, pause, rewind, etc.
npx playwright test --ui
```

### Running component tests

These tests run locally using Vitest.

Make sure you're in the `frontend/` folder and that dependencies are installed:

```bash
cd frontend
npm install
```

You can now run the tests with:

```bash
npm run test
# or if you only want to run one specific file
npx vitest run src/tests/NAME_OF_COMPONENT.test.tsx
```

## Login guide

Possible to create an account for our application, you just need to clik on "Log in" in the upper right corner and write in an email adress. Example: <student@example.com>.

You can log in with an user to add your own reviews.

## The application

Our application is a book browsing and review platform where users can explore, sort, and learn about books stored in our database. The goal is to provide an intuitive and visually pleasant interface that encourages exploration, feedback, and engagement with literature. Below we describe the main structure and components of the application.

`Home`: This is the main page where the user sees resources from the database in a grid view. Through scroll with lazy loading, the user will load more resources and can browse all resources in the database. Above the grid there’s a "Filters"-button, "Sort by:"-button, and a searchbar. The "Filters"-button opens a drawer where the user can filter by genre and/or rating. If you choose to filter, there will appear a "chosen filter"-bubble above the grid, making it clear what you have filtered on, and lets you close it by clicking on the bubble. The "Sort by:"-button opens an option that lets you sort resources ascending/descending by rating, year of publication, or alphabetically by title. The search-bar lets you search books by title, author or genre. Each resource component in the grid is clickable so the user can open it to read more about the desired book, and they will be sent to `AboutBookPage`.

`AboutBookPage`: This page will show the same information included in the book component (title, author, year of publication, genre, rating) and, in addition, a short summary from the book similar to what you find on the back cover. On the right side (desktop size) there is a scrollable overview of reviews that the book has received from different users. Users can now log in, submit and edit their own reviews directly from this page.

`Navbar`: In the navbar, the user can register a user, log in and log out of the application to enable access to write reviews on books, plus the title "BadReads" is a clickable button back to `Home`. There’s also a function to switch between light and dark appearance. The user can choose _light_ for standard light mode, _dark_ for dark mode, or right click for _system_ to follow the device’s system settings.

`Footer`: In the footer, the user will find information about the website and a “Home” button.

### Color choices

At the start of Project 2, after choosing books as our resource, we created a color palette with codes for light mode and dark mode. These colors were developed based on the group’s discussion of the colors and mood we associate with books and libraries. We wanted a pleasant palette with a minimalist and harmonious expression, and the following became our starting point:

![Color palette for P2](/documentation//public/colorPalette.png)

We have however continuously modified the colors and contrasts in both darkmode and lightmode to give the users a better user experience, be more optimalized for universal design and accessibility.

### Choice of technology and component library

- **Vite**: chosen as bundler for fast development and hot reloading.
- **React + TypeScript**: provides clear types and a better developer experience.
- **GraphQL + Apollo**: typed schema, single endpoint, caching, and a great developer workflow via Apollo Sandbox.
- **SQLite + better-sqlite3**: lightweight, zero-config database for local development.
- **Tailwind CSS**: used for styling, since several in the group had experience with it and we wanted a more readable alternative than plain CSS files.
- **MUI (Material UI)**: used as the component library, mainly because it offers ready-made, user-friendly components that fit the project (e.g., rating and cards).
- We also considered **Bootstrap**, but chose MUI as it gave a more cohesive look and had the components we needed.
- **Vitest**: selected as the unit-testing framework because it integrates seamlessly with Vite, and offers fast test execution.
- **Playwright**: used for end-to-end testing, chosen for its reliable cross-browser automation and intuitive, developer-friendly API.

## Project structure

- `backend/`
- `documentation/`
- `frontend/`
- `README/`

### Frontend structure

- `e2e/`: contains Playwright end-to-end test suites that simulate real user interactions (e.g., navigating between book pages) to ensure the application works as expected in the browser.
- `src/`
  - `assets/`: static files like images or icons.
  - `components/`: all reusable UI components (BookCard, Navbar, FilteringDrawer, etc.).
  - `context/`: react context API for making information globally accessible.
  - `graphql/`: queries from frontend to backend.
  - `hooks/`: custom hooks like `useTheme` for dark mode.
  - `pages/`: application pages (Home, AboutBookPage).
  - `tests/`: Vitest component tests for validating UI functionality.
  - `utils/`: shared helpers and types (interfaces).
  - `apollo.ts`

#### Components

- `AboutBook`: detail view of a book (title, author, year, genre, rating, summary).
- `AddOrEditYourReview`: component allowing logged in users to submit a new review (rating + comment) for a book and edit their review.
- `AuthButton`: opens a dialog to log in via email.
- `BackToTopButton`: scrolls to top smoothly
- `BookCard` / `BookCardOverview`: shows book info in a grid or detail view.
- `FilteringDrawer`: filters books by genre and/or rating in Home-page.
- `ReviewOverview`: contains reviews per book, add or edit your review, and interaction between `AddOrEditReview` and `ReviewPerBook`.
- `ReviewPerBook`: displays reviews within `ReviewOverview`.
- `SearchBar`: filtering based on your search-prompt.
- `SortingDirectionButton`: sorting by "ASC" or "DESC".
- `SortingMenuButton`: sorting by rating, year, or author/title.
- `StyledButton`: helper-component for same styling of filtering/sorting buttons.
- `Navbar` / `Footer`: navigation and footer with site info.
- `ThemeToggle`: switch between light and dark mode, or follow system settings.
- `ChosenFilterBubble`: shows which filters are chosen, lets you close it by clicking on the bubble.

### Backend structure

- `database/`
  - `database.sql`: A startup script that creates the tables in SQLite and defines the database structure.
  - `database.ts`: Establishes a connection to the SQLite file (`mydatabase.db`) so we can read and write data. For example, this is exported so `resolvers.ts` can use `db.prepare("SELECT * FROM books").all()`.
  - `resolvers.ts`: Handles how data is actually retrieved or changed. It’s the logic behind resolving the queries defined in `schema.ts`.
  - `schema.ts`: Describes what data the API offers and how the data is structured.
  - `seed.ts`: This script populates (seeds) our SQLite database with initial data from db.json.
- `src/utils/`
  - `sorting.ts`: Defines types and constants for sorting books in our application.
- `database.sqlite`: Defines the database schema (table structures) for our SQLite database.
- `db.json`: Provides mock books and reviews for our database.
- `server.ts`: Imports the schema and resolvers and assembles them into a real web server that runs our API.

## Improvements from the previous iteration

Compared to the previous iteration, we have

- Improved usability of `FilteringDrawer`, making it easier to select and deselect filters. Added the possibility to filter based on rating.
- Changed position of components on the Home-page, making it more intuitive for a user to navigate, managing user expectation.
- Fixed bugs related to caching, state handling and rating.
- Reorganized the folder structure: removed unneccessary top folder.
- Expanded and cleaned the database for more realistic test data.
- Updated and expanded tests for our application, ensuring full coverage.
- General improvement of styling such as correcting colors of elements.

## Testing

This project uses:

- Vitest + React Testing Library for unit/component tests.
- Playwright for simple end-to-end (E2E) flows.

### Where tests live

- Component: `src/tests/*.test.tsx`
- E2E: `e2e/*.spec.ts`
- Shared test setup: `src/setupTests.ts`

### What we cover

- **Rendering and Accessibility**: Elements render with correct roles, labels, and alt text.
- **User Interaction**: Buttons and UI elements respond correctly to click, keydown, and other events.
- **Conditional Rendering**: Components adapt to props and internal state (e.g., scroll trigger visibility, placeholder image fallback).
- **Component Logic**: Functions like sorting toggles and navigation handlers are tested through user events.
- **Full user journey** – Playwright e2e test covers navigating from the homepage to a book, logging in, and adding/editing a review through the real UI.

## Accessibility

Throughout the project, we have worked iteratively on accessibility, making sure buttons and interactive elements can be used with the keyboard, adding helpful aria-labels, and improving the semantic structure. We also continuously evaluated and adjusted our color palette in both light and dark mode to improve contrast, to make the interface easier to use for all users, including those relying on assistive technologies.

## Sustainability

We have taken multiple steps to improve sustainability. By storing the average rating directly in the backend instead of recalculating it every time, we avoid unnecessary computation and reduce how much data needs to fetched when displaying books. The frontend also only fetches the data it actually needs. For example, the homepage retrieves books but not their reviews, which reduces network usage and improves loading times. Lazy loading makes sure that only the books currently visible to the user are rendered, which prevents unnecessary processing on unseen content. We have also minimized unnecessary re-renders through careful state management, reducing CPU work during navigation and interaction. In addition, a dark mode option can help reduce energy consumption on devices with OLED displays, since darker pixels require less power. Together, these choices contribute to a more efficient, responsive, and environmentally friendly application.

## Use of AI

In general we have used Microsoft Copilot, ChatGPT og GitHub Copilot as a sparring partner during the project to help finding small errors in our code, to get some inspiration of solutions for issues or clean-up of our code. We have used AI to generate smaller code snippets and advice on topics such as debugging, naming and integration. In some cases, AI has suggested larger changes to the codebase, like code for integrating a date-field in reviews.

Specific situations where we have used AI:

- One example where AI was used for guidance was the styling of the MUI TextArea element. It wasn’t straightforward to change the text and border styling since `!text-[] dark:!text-[]` didn’t work as on other elements. We used AI to explain how MUI wraps the input with its own components and specific class names we needed to target in this section. See lines 196–227 in `AuthButton.tsx` for the solution AI helped us with. In addition, we used AI to generate example books and reviews for testing and demonstration purposes.
- Refactor of button after feedback from peers: used checkbox and refactored to use IconButton instead. (SortingMenuButton.tsx)
- Implement date (timestamp) on reviews.
- Extract useAuth as a hook.
- During the development of the tests, AI was used to support the process of writing tests:
  - Explain unfamiliar testing patterns.
  - Suggest improvements to accessibility and user-focused test queries.
  - Provide examples for mocking browser APIs and external dependencies.

In some cases, we have used AI more extensively. The image below shows a chat with GitHub Copilot suggesting changes for adding timestamps to book reviews. The AI-suggestions missed some key details and had to be revised, but this work method still saved a lot of time compared to developing without AI.

<!-- markdownlint-disable-next-line MD033 -->
<img src="./documentation/public/useOfAI.png" alt="Chat with Copilot showing the AI suggesting code changes" width="200">

## Known issues

- TypeScript module resolution warning: Our backend still uses moduleResolution: "node" which is deprecated and will be removed in TypeScript 7. This does not break the project now, but the config must be updated in the next iteration.
- MUI uncontrolled Rating warning: The Rating component in ReviewPerBook.tsx triggers a warning because it starts as uncontrolled and later receives a value. This does not affect functionality, but should be fixed by converting it to a controlled component.
- Books sorted by average rating in the home page don't adjust their placement when a new review changes the average rating of a book. This is because the averageRating value isn´t immediately updated, and requires a refresh of the `Home` page. We likely need to update the cache directly to fix this.
