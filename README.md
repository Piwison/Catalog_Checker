# Catalog Checker Project

This project is designed to check and validate product catalog content. It interfaces with an n8n workflow to fetch items that have potential errors or issues.

## Prerequisites

- Node.js and npm (or yarn) for the frontend application.
- An n8n instance (local or cloud) for the backend workflow.

## Getting Started

### 1. Frontend Application Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd catalog-checker # Or your project's directory name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    See the [Frontend Configuration](#frontend-configuration) section below to set up the n8n webhook URL.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running, typically at `http://localhost:5173` (for Vite projects).

### 2. Backend n8n Workflow Setup

See the [n8n Workflow Details](#n8n-workflow-details) section for instructions on importing and configuring the backend workflow.

## Frontend Configuration

### n8n Webhook URL

The frontend application fetches error items data from an n8n webhook. The URL for this webhook is exposed by the n8n workflow (`Catalog_Checker.json`) once it's active.

1.  In the root of the project, create a file named `.env` if it doesn't already exist.
    *(Note: This file should be listed in your `.gitignore` file to prevent it from being committed to your repository.)*

2.  Add the following line to your `.env` file, replacing the example URL with your actual n8n webhook URL (typically `http://localhost:5678/webhook/contentValidation` if running n8n locally with the default path from `Catalog_Checker.json`).

    ```env
    # For Vite based projects (which this project uses)
    VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/contentValidation
    ```
    The application code in `src/pages/ErrorItemsPage.tsx` is set up to use `import.meta.env.VITE_N8N_WEBHOOK_URL`. If not set, it has fallbacks for `process.env.REACT_APP_N8N_WEBHOOK_URL` and then `http://localhost:5678/webhook/contentValidation`.

3.  After creating or modifying the `.env` file, you **must restart your frontend development server** for the changes to take effect.

## n8n Workflow Details (`Catalog_Checker.json`)

The backend logic for this project is managed by an n8n workflow, defined in `Catalog_Checker.json`. This workflow is responsible for:
- Reading product data from a Google Sheet.
- Using a Google Gemini AI model via an AI Agent to assess semantic relevance and identify content issues.
- Filtering products based on a relevance score.
- Formatting the data and exposing it via a webhook for the frontend application.

### Importing the Workflow

1.  Open your n8n instance.
2.  Go to the "Workflows" section.
3.  Click on "Import from File".
4.  Select the `Catalog_Checker.json` file from this project.
5.  The workflow will be imported. You may need to activate it.

### Workflow Components & Configuration

The workflow consists of the following key nodes:

-   **Webhook (`/contentValidation`):** This is the entry point for the frontend to request data. The default path is `contentValidation`.
-   **Google Sheets: Read Product Data Export:** Reads product information from a specified Google Sheet.
    -   **Credentials:** Requires a configured "Google Sheets account" in n8n.
    -   **Configuration:** You'll need to update the `documentId` (URL of your Google Sheet) and `sheetName` within this node's parameters to point to your product catalog.
-   **If Score >= 7:** A conditional node that currently bypasses AI processing if a score (presumably from a previous run or another source in the sheet column `If_Error`) is already high. Products with scores less than 7 (or no score) proceed to the AI agent.
-   **AI Agent & Google Gemini Chat Model:**
    -   **AI Agent1:** Constructs a prompt to assess product content using the data from Google Sheets.
    -   **Google Gemini Chat Model1:** Sends the prompt to the Google Gemini API (`gemini-2.5-flash-preview-05-20` model).
        -   **Credentials:** Requires a configured "Google Gemini (PaLM) Api account" in n8n.
    -   **Structured Output Parser:** Ensures the AI's response is in the expected JSON format (ProductId, relevance_score, issue_fields, error_type, justification).
-   **Google Sheets (Update):** This node appears to be configured to update the source Google Sheet with results from the AI (e.g., relevance_score in the `If_Error` column). Ensure its `documentId` and `sheetName` match the source sheet.
-   **Filter:** Filters items based on the `relevance_score` (specifically, items with a score less than 7 proceed).
-   **Edit Fields:** Transforms and maps the data from the AI agent and the original Google Sheet into the final format specified in `n8n-API.md`.
-   **Respond to Webhook:** Sends the final processed JSON data back to the frontend.

### Required Credentials in n8n

Before the workflow can run successfully, you must set up the following credentials in your n8n instance:

-   **Google Sheets account:** For reading from and potentially writing to Google Sheets.
-   **Google Gemini (PaLM) Api account:** For accessing the Google Gemini large language model.

Ensure these credentials are created and selected in the respective nodes within the workflow.

## Project Structure (Brief Overview)

-   `public/`: Static assets.
-   `src/`: Main application source code.
    -   `components/`: Reusable UI components.
        -   `ErrorItems/`: Components specific to displaying error items.
    -   `pages/`: Top-level page components (e.g., `ErrorItemsPage.tsx`).
    -   `types/`: TypeScript type definitions.
    -   `App.tsx`: Main application component, routing setup.
    -   `main.tsx`: Entry point of the application.
-   `.env`: Environment variable configuration (should be in `.gitignore`).
-   `n8n-API.md`: Example API response format from the n8n webhook.
-   `Catalog_Checker.json`: The n8n workflow definition file.
-   `vite.config.ts`: Vite build tool configuration.
-   `package.json`: Project dependencies and scripts.
-   `tsconfig.json`: TypeScript configuration.

## Available Scripts

In the project directory, you can run:

-   `npm run dev` or `yarn dev`: Runs the app in development mode.
-   `npm run build` or `yarn build`: Builds the app for production.
-   `npm run lint` or `yarn lint`: Lints the codebase.

---
*This README is a basic template. Feel free to expand it with more details about your project, deployment instructions, contribution guidelines, etc.* 