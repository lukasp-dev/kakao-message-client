Here's an improved version of your `README.md` with better image placement and alignment. The goal is to make it visually appealing while maintaining clarity and flow.

---

# Gallery SOMA Notification App

## Introduction

In KakaoTalk, the ability to send the same message to multiple friends simultaneously is limited to group chats, creating inefficiencies for businesses that need to communicate directly with individual customers. To overcome this limitation, I developed a **desktop application exclusively for Gallery SOMA**. This app allows the CEO to send bulk messages to customers all at once using their KakaoTalk account. The application is user-friendly and can be easily downloaded as a `.dmg` file for installation on desktop devices.

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/5f8c0a2edc1f60b0023e3377d0d5f5de.jpg" alt="Download Example" width="70%">
</div>

---

## System Architecture

The app's robust architecture ensures secure, scalable, and seamless functionality by leveraging the following technologies:

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/6cefe2651cf938a7938a86f12ec91a57.jpg" alt="System Architecture" width="80%">
</div>

- **S3:** Secure storage and management of image data.  
- **EC2:** Virtual server provisioning and management for hosting and scaling applications.  
- **Docker:** Containerization for rapid deployment, consistent environments, and streamlined management.  
- **Recoil:** Simplified global state management for enhanced app performance.  
- **Electron:** Cross-platform desktop application development using modern web technologies.  

---

## Workflow

The app's streamlined workflow ensures intuitive operation for users:

1. **Login Screen**  
   - Enter ID & password → Request authentication  

2. **Authentication Result**  
   - **Success:** Load friend list → Select friends  
   - **Failure:** Display error message → Retry/Reset password  

3. **Compose Message**  
   - Select a template (Text/Text+Image) → Draft message content  

4. **Send Message**  
   - Confirm delivery → Execute message sending  

5. **Delivery Result**  
   - **Success:** Display success message  
   - **Failure:** Display failure message → Retry/Modify message  

---

## Main Functions

### **Login Screen**

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/dd209dc042f1de895de2ae8f9f2855fc.jpg" alt="Login Screen" width="60%">
</div>

The user logs in by entering their KakaoTalk ID and password. If authenticated, the friend list is loaded for selection.

---

### **Message Composition**

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/3ca70d7657f028de6c1511b6119732dd.jpg" alt="Message Composition" width="60%">
</div>

Users can select a message template (text-only or text + image) and draft the desired content for broadcasting.

---

### **Bulk Messaging**

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/d4603f82d9766d41f905c65f89fdb2d7.jpg" alt="Bulk Messaging" width="60%">
</div>

Once the message is composed, users can confirm delivery and send it to all selected friends at once, saving significant time and effort.

---

## Features and Benefits

- **Efficient Communication**: Transition from one-on-one messaging to bulk notifications, saving up to **95% of the CEO’s time and effort**.  
- **Cross-Platform Compatibility**: Built with Electron, ensuring the app works seamlessly across different operating systems.  
- **Scalable Architecture**: Leveraged AWS (S3 & EC2) for secure data storage and efficient app scaling.  
- **Customizable Templates**: Pre-designed templates for text-only or text + image messages simplify the content creation process.  
- **Secure and Reliable**: Docker-based containerization ensures a consistent and secure runtime environment.  
