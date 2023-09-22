# Work Shop - Client-Side Repository

<div align=center>
<a href='https://www.workshop-il.com/'>
<img src="./public/icons/workshop-logo.png">
</a>
</div>

Welcome to the E-Commerce Work Tools Shop, a secure and efficient platform for purchasing workshop tools and equipment. This project combines React for the front-end, Node.js and NestJS for the back-end, and establishes a RESTful API to connect the client and server. The data is stored in a MySQL database, and robust security features have been implemented to ensure the safety of user data and transactions. The front-end is hosted on Netlify, while the back-end is hosted on Heroku.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Security Features](#security-features)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Related](#related)

## Getting Started

Use the [Live Demo](https://www.workshop-il.com/)

Or install locally:

To get started with the Work Shop web application, firsly make sure to install the [server-side](https://github.com/SagiMines/final-project-nest-server) locally.

then, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/SagiMines/final-project.git
cd final-project
```

2. Install the necessary dependencies for the front-end.

```bash
npm install
```

3. Run the application locally for development.

```bash
npm run start
```

4. View the application on [localhost:3000](http://localhost:3000)

## Usage

Once the project is set up and running, users can:

- Browse and search for workshop tools and equipment.
- Add items to their cart and proceed to checkout.
- Create an account or log in for a personalized shopping experience.
- View order history and track the status of their orders.
- Enjoy a secure and user-friendly shopping experience.

## Overview

The E-Commerce Work Tools Shop is designed to provide an exceptional shopping experience for users seeking workshop tools and equipment. Whether you're a DIY enthusiast or a professional tradesperson, our platform offers a wide selection of high-quality products. Here's an overview of the key components of this project:

### Technology Stack

- **Front-end:** This project utilizes React for the front-end, creating an interactive and user-friendly shopping interface. React's component-based architecture makes it easy to manage and update the user interface.

- **Back-end:** The back-end of the platform is powered by Node.js and NestJS. Node.js ensures efficient server-side operations, while NestJS offers a structured and scalable application architecture.

- **Database:** User and product data is stored in a MySQL database, ensuring data integrity and reliability.

- **API:** The client-server communication is facilitated through a RESTful API, allowing for real-time updates on product availability, pricing, and order status.

### Security Features

To ensure the safety and confidentiality of user data and transactions, several security measures have been implemented:

- **Data Encryption:** Sensitive user information, such as login credentials and payment details, is encrypted using industry-standard encryption protocols, preventing unauthorized access.

- **Input Validation:** Robust input validation mechanisms prevent malicious input from users, protecting against common security threats like SQL injection and cross-site scripting (XSS).

- **Authorization and Authentication:** Strong user authentication and authorization mechanisms require users to verify their identity securely. Role-based access control ensures that only authorized individuals can perform specific actions.

- **Session Management:** User sessions are managed securely to prevent session hijacking or unauthorized account access. This includes features like automatic session timeouts and secure cookie handling.

## Key Features

- User-friendly and responsive front-end interface powered by React.
- A scalable and structured back-end architecture using Node.js and NestJS.
- Real-time updates on product availability, pricing, and order status through the RESTful API.
- Secure handling of sensitive information through encryption and input validation.
- Robust authentication and authorization mechanisms.
- Session management to protect user sessions from unauthorized access.
- MySQL database for reliable data storage.
- Deployment on Netlify (front-end) and Heroku (back-end) for easy access and scalability.

## Deployment

- **Front-end:** The front-end is hosted on Netlify, providing a reliable and scalable platform. Any changes pushed to the repository's main branch will trigger automatic deployments.

- **Back-end:** The back-end is hosted on Heroku, offering a cloud-based solution for the server. Heroku provides easy scalability and maintenance.

## Related

[Work Shop Server-Side Repository](https://github.com/SagiMines/final-project-nest-server)
