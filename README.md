

# Female Ton – Telegram Mini-App Fertility Tracker in Web3

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

### Demo
Watch the demo video below to see the app in action:


<video width="320" height="240" controls>
  <source src="demo/life-demo-femaleton.mp4" type="video/mp4">
  Demo should be here, but your browser does not support it find it in /demo/ folder
</video>

### Smart Contract
Explore the working smart contract with the features described above: [Smart Contract on GitHub](https://github.com/gicha/female-ton-contract).

## Problem Statement
The number one problem for women is tracking their menstrual cycle. According to a survey, 73% of women want a smart solution for this.

### Female Ton Offers:
- **Convenience:** No need for a separate application.
- **Security:** Data encrypted with a smart contract.
- **Intelligence:** Personalized well-being recommendations based on the cycle via a bot.

## Tokenomics
- **Subscribe to doctors**
- **Invite friends**
- **Stay anonymous or share data**

## Development Background
Built from scratch during the Hackathon in Tbilisi organized by TON Ecosystem.

### Strong Team:
- **Anna Nazarova (Founder, CPO)**
  - Previously worked with VP Flo (#1 Female Tracking App).
  - Launched Soula – Pregnancy Tracker (Investors: Berkeley SkyDeck, Natalya Vodianova).

- **Alex Malyshev (CTO)**
  - Technical founder.
  - Top 50 Hacker by MLH.
  - TechStars Startup Awards Winner.

- **Vlad Kalashnikov (Lead Designer)**
  - Designed products for VK, VTB, MTS for millions of users.

- **Michael Kolchanov (Head of Engineering)**
  - Writes TON smart contracts.
  - Leads development teams of up to 50 people.

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
