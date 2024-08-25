# Project Documentation

Role - Frontend Developer (React + TypeScript)

## Thought Process

Here's a detailed walkthrough of my thought process and the steps I took during the development:

- **Understanding the Task Requirements:** I began by thoroughly going through the task document to understand the core features that needed to be implemented. This helped me prioritize and outline the features that would be crucial to the project’s success.
- **Mocking the Service with MSW:** I mocked the local service using MSW. I followed their official documentation to implement the GET and POST calls - https://mswjs.io/docs/integrations/browser 
- **Building the User Interface:** 
  - Once the service was mocked, I moved on to developing the UI. I utilized CSS Grid to ensure that the UI displayed 3 cards in each row consistently. 
  - Since the static JSON response didn’t include thumbnails, I downloaded cat images from Pexels and included them into the static response.
  - Initially, I tried using image links directly, but the mock server intercepted these requests without a proper handler. This caused the images to fail to display. To resolve this, I opted to use static images in the project.
- **Implementing Drag and Drop Functionality:** I implemented drag-and-drop functionality using the `react-beautiful-dnd` package. I followed [this detailed guide](https://code.pieces.app/blog/implement-react-beautiful-dnd) to complete this feature.
- **Overlay Effect on Click:** I then added an overlay effect that activates when a document is clicked.
- **Updating Document Positions & Saving:**
  - To maintain the correct order of documents when dragged and dropped, I updated the position property of documents.
  - Additionally, I implemented the save functionality that triggers a mocked POST call every 5 minutes to save the current state.
- **Loading Spinners for Images:** I utilized the `react-spinners` package and incorporated the `<ClipLoader />` component to display a spinner whenever an image is in the process of loading.
- **Mocked PUT and DELETE Calls:** Finally, I extended the API mocking by adding PUT and DELETE handlers in `handlers.ts`

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) or **Yarn** (v1.x or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AishwaryaParab/zania-project.git
   cd your-repo-name

2. **Install the dependencies:**

   If you're using npm:
   ```
   npm install
   ```

   Or if you're using yarn:
   ```
   yarn install
   ```

3. **Running the application:**
   ```
   npm run dev
   ```

   OR 

   ```
   yarn dev
   ```

   This will start the Vite development server. Open your browser and navigate to http://localhost:5173/. You should see your React application running.
