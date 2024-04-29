# Auto interact with Tamagotchy

This project provides an automated way to interact with your Tamagotchy on the Solana blockchain, simulating the actions
you would typically perform via the UI. The script periodically executes transactions such as feeding, showering, and
giving love to your Tamagotchy to maintain its state without manual intervention.

## Steps to Set Up and Run the Project

1. **Use a Virtual Machine**: It's recommended to run this code on a virtual machine to ensure it operates continuously
   without interruptions. You can use cloud services like Google Cloud or AWS. Here is
   a [tutorial on setting up a VM on Google Cloud](https://cloud.google.com/compute/docs/instances/create-start-instance).

2. **Create a .env File**: You need to create a `.env` file in the project root with the necessary environment
   variables. You can use the included `.env.local` file as a template.

3. **Install Dependencies**:
   ```bash
   npm install

4. **Install pm2**:
   ```bash
   npm install pm2@latest -g

5. **Run the Script with PM2**;
   ```bash
   pm2 start auto_tamagotchy.js

6. **Setting Environment Variables**:
    - **RPC_URL**: This should be set to any Solana RPC. For instance, [Helius](https://www.helius.dev/) is recommended.
    - **USER_PK**: This environment variable should be the private key associated with the wallet that holds your NFTs,
      formatted as an array of numbers. ⚠️ **Be cautious with this information as it is sensitive.** ⚠️

## Monitoring and Managing the Script

- **Check Logs**: To check the state of the execution or debug issues, use:
   ```bash
   pm2 logs
- **Restarting the Script**: If you need to restart the script after making changes or for any other reason, use:
   ```bash
   pm2 restart auto_tamagotchy
- **Stopping the Script**: To stop the script when it's no longer needed, use:
   ```bash
   pm2 stop auto_tamagotchy

By following these steps, you can ensure that your Tamagotchy is interacted with automatically, maintaining its status
and health without needing to manually manage it through the UI.