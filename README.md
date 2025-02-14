# Droid AI

Droid AI is a ChatGPT clone that leverages Google's Generative AI to provide intelligent responses to user inputs. This project was developed as part of a task assigned by a company and was collaboratively built by a team of four individuals.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development Process](#development-process)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Davedigital9/drod_ai.git
2. Navigate to the project directory
    cd drod_ai
3. Install the dependencies
    npm install
4. Start the development server
    npm start

## Usage
Once the server runs, open index.html in your web browser to interact with Droid AI. You can start a new chat, send messages, delete your messages, and receive AI-generated responses (Drod AI can make mistakes, so verify important information).

## Development Process
This project was developed by a team of four individuals @realvic22, @Oluwatomilola, and @DeborahOlaboye. The development process involved several key steps:
    1. Planning and Design: We began the project by outlining the requirements of its functionality as stated by our instructor, @Johla from Web3Bridge. The wireframes for the design interface were created defining the overall structure of the application
    
    2. Setting up the Environment: We set up the development environment by initializing a new Node.js project and installing the necessary dependencies such as Express, Axios, and Google's Generative AI library.
    
    3. Building the Backend: We implemented the backend API in generative-ai-response.js. The project was deployed to Vercel, and the API key was stored in the environment variables. The generative-ai-response.js file was responsible for communicating between the backend and front end of our project. This involved setting up an Express server, handling CORS, and integrating with Google's Generative AI to generate responses based on user input.

    4. Creating the Frontend: We developed the front end using HTML, CSS, and JavaScript. The main interface is defined in index.html, with styles in style.css and functionality in script.js. The front end allows users to start new chats, send messages, and receive AI responses.

    5. Testing and Debugging: The development process was filled with constant testing and debugging to ensure the full functionality of the project. From interacting with the bot locally on our PC to the point of it's deployment to the hosting site, we ensured there were no lapses in performance.

    6. Deployment: Finally, we prepared the project for deployment by configuring the necessary scripts and ensuring all dependencies were correctly listed in package.json.

## License
This project is licensed under the ISC License. See the LICENSE file for more details.

