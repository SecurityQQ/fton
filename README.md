# Female Ton – Telegram Mini-App Fertility Tracker in Web3
[![Build Status](https://img.shields.io/github/actions/workflow/status/SecurityQQ/fton/CI.yml)](https://github.com/SecurityQQ/fton/actions)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/SecurityQQ/fton/releases)

## Vote for us on DoraHacks
Help us to win TON Hackathon for a cookie :)

<a target="_blank" href="https://dorahacks.io/buidl/13265"><img src="https://cdn.dorahacks.io/images/buidl-embed/colored-full.png" height="50" width="170" /></a>


![Preview](/demo/preview.png)


## Project Overview
Female Ton is a Web3-based fertility tracker designed to be a convenient, secure, and smart solution for tracking menstrual cycles through a Telegram mini-app. The tracker ensures the privacy and encryption of user data using smart contracts, providing personalized well-being recommendations through a bot.

### Key Features
1. **Create an Account**
   - Requires 0.008 TON.
   - Account creation may take some time.
2. **Retrieve the Number of Saved Data Cards**
   - Each data card is a contract with an index (similar to an array).
   - Allows finding out the IDs of all the user's data cards.
3. **Add a Card with Data**
   - Records menstruation data as an encrypted string.
   - Provides access to the data only to the user (currently).
4. **Retrieve the Latest Data Card**

## Demo

### Recorded Demo
Watch the demo video below to see the app in action:

[![Demo Video](https://img.youtube.com/vi/Vq7hZ9f3o1s/0.jpg)](https://youtu.be/Vq7hZ9f3o1s)

### Live Demo

Join [@femaleton](https://t.me/femaleton) and get a quick access to our bot

### Smart Contract
![SmartContract](/demo/smart-contract.png)

Explore the working smart contract with the features described above: [Smart Contract on GitHub](https://github.com/gicha/female-ton-contract).

## Problem Statement
The number one problem for women is tracking their menstrual cycle. According to a survey, 73% of women want a smart solution for this.

### Female Ton Offers:
- **Convenience:** No need for a separate application.
- **Security:** Data encrypted with a smart contract.
- **Intelligence:** Personalized well-being recommendations based on the cycle via a bot.

## Tokenomics

![TokenEconomy](/demo/token-economy.png)

- **Subscribe to doctors**
- **Invite friends**
- **Stay anonymous or choose to share data**

## Development Background
Built from scratch during the Hackathon in Tbilisi organized by TON Ecosystem.

### Strong Team:
- **Anna Nazarova (Founder, CPO)**
  - Previously worked with VP Flo (#1 Female Tracking App).
  - Launched Soula – Pregnancy Tracker (Investors: Berkeley SkyDeck, Natalya Vodianova).
  - Contact: [LinkedIn](https://www.linkedin.com/in/anna-n-a214b9122/)

- **Alex Malyshev (CTO)**
  - Technical founder.
  - Top 50 Hacker by MLH.
  - TechStars Startup Awards Winner
  - Contact: [GitHub](https://github.com/SecurityQQ)

- **Vlad Kalashnikov (Lead Designer)**
  - Designed products for VK, VTB, MTS for millions of users.
  - Contact: [Telegram: @vldklsnkv](https://t.me/vldklsnkv)

- **Michael Kolchanov (Head of Engineering)**
  - Writes TON smart contracts.
  - Leads development teams of up to 50 people
  - Contact: [GitHub](https://github.com/gicha)

## Design & UI Kit

Our Design & UI Kit is meticulously crafted to provide a seamless and engaging user experience. Developed during the hackathon, the design encompasses various aspects to ensure adaptability, usability, and visual appeal.

### Unique Features
- **Adaptive Design:** Our design adapts seamlessly to different screen sizes and orientations, providing a consistent experience across devices.

![adaptive.png](/demo/adaptive.png)

- **Dark Theme:** A dark theme is available, reducing eye strain and enhancing readability in low-light environments.

- **Platform-Specific Design:** Tailored designs for iOS and Android ensure that the app feels native to each platform, adhering to their respective design guidelines.


### UI Components
The UI Kit includes a comprehensive set of components such as buttons, forms, icons, and more, allowing for easy customization and scalability.

### Full UI Kit Preview
![ui-kit](/demo/ui-kit.gif)

### Request the Full Design Kit
For access to the full Design & UI Kit, including detailed assets and design files, please contact us. We are happy to share our resources to help you understand and contribute to the project.

## Project Structure
- `/src/pages/api/contracts` – Interaction with smart contracts.
- `/src/pages/api/` – RESTful API.
- `/src/pages/` – Frontend built with Next.js.
- `/prisma/` – ORM connection.
- `/hooks/*` – Hooks, mostly for TON Connect integration.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/gicha/female-ton-contract.git
   ```
2. Navigate to the project directory:
   ```bash
   cd female-ton-contract
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Set up environment variables (refer to `.env.example` for required variables):
   ```bash
   cp .env.example .env
   ```
5. Run the development server:
   ```bash
   pnpm run dev
   ```

## Contributing
We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
