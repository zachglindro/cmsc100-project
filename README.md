<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/zachglindro/cmsc100-project">
    <img src="src/assets/welcome/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Field to Feast</h3>
  <p align="center">
    Field to Feast is an e-commerce website that helps farmers sell their produce directly to consumers. 
    <br />
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![Field To Feast shop page](https://github.com/zachglindro/cmsc100-project/assets/66626397/ae2bfb2a-57d1-431b-ac78-ceb8e706d5ee)


## Project Features

  # User Management
  # - User Registration and Login
      - Users can not be able to register with an already existing email and username.
      - Automatic assignment as customer users upon sign-up.
  # - Admin (DA) Account
      - Pre-assigned DA account for managing the catalog and administrative tasks.
      - Admin can manage user accounts, product listings, order fulfillment, and view sales reports.
  # - Authentication
      - Only registered users can access the website.
      - Customers can log in and log out.
      - Protected routes to ensure admin-exclusive access where necessary.
      
  # Customer (Shop)
  # - Product Listings
      - View products categorized by name, type (crops or poultry), price, and quantity.
      - Sort products in ascending or descending order based on the mentioned categories.
  # - Shopping Cart Management
       - Add items to the cart.
       - Delete items from the cart.
       - Count and display the total number of items in the cart.
       - Display the total price of items in the cart.
  # - Order Management
      - Create orders from the shopping cart.
      - Option to cancel orders if not confirmed by the admin.
      - Default transaction mode is cash-on-delivery.

  # Administrator (DA)
  # - Dashboard
      - Centralized dashboard for managing e-commerce activities.
  # - User Account Management
      - View and manage the list of registered users.
      - Generate reports on the total number of users.
  # - Product Listings Management
      - Add and update products including name, type, price, description, and quantity.
      - Sort product listings by name, type, price, or quantity.
  # - Order Fulfillment
      - Confirm customer orders.
      - Update inventory upon order confirmation.
      - Track order status (Pending, Completed, Canceled).
  # - Sales Reports
      - View detailed sales reports by product, including income generated.
      - Generate summary reports of transactions on a weekly, monthly, and annual basis.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![React][React.js]][React-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple steps.


### Prerequisites
[Node.js and npm are required to run this project.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/zachglindro/cmsc100-project.git
   ```
2. Install NPM packages for the frontend and backend
   ```sh
   npm install
   cd database-api && npm install
   ```
3. Enter your MongoDB connection string in `database-api/secrets.js`
   ```sh
   echo "export const connectionString = yourConnectionString" > database-api/secrets.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

To run the project, start the frontend and backend servers.
```sh
npm start
cd database-api && npm start
```

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/zachglindro/cmsc100-project.svg?style=for-the-badge
[contributors-url]: https://github.com/zachglindro/cmsc100-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/zachglindro/cmsc100-project.svg?style=for-the-badge
[forks-url]: https://github.com/zachglindro/cmsc100-project/network/members
[stars-shield]: https://img.shields.io/github/stars/zachglindro/cmsc100-project.svg?style=for-the-badge
[stars-url]: https://github.com/zachglindro/cmsc100-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/zachglindro/cmsc100-project.svg?style=for-the-badge
[issues-url]: https://github.com/zachglindro/cmsc100-project/issues
[license-shield]: https://img.shields.io/github/license/zachglindro/cmsc100-project.svg?style=for-the-badge
[license-url]: https://github.com/zachglindro/cmsc100-project/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
