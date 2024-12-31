# Gallery SOMA Notification App

## Introduction

In KakaoTalk, the ability to send the same message to multiple friends simultaneously is limited to group chats, creating inefficiencies for businesses that need to communicate directly with individual customers. To overcome this limitation, I developed a **desktop application exclusively for Gallery SOMA**. This app allows the CEO to send bulk messages to customers all at once using their KakaoTalk account. The application is user-friendly and can be easily downloaded as a `.dmg` file for installation on desktop devices.

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/5f8c0a2edc1f60b0023e3377d0d5f5de.jpg" alt="Download Example" width="70%">
</div>

---

## Used Technologies

### IDE
[![Visual Studio Code](https://img.shields.io/badge/IDE-Visual%20Studio%20Code-blue?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

### Languages / Frameworks
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/) 
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/) 
[![Express](https://img.shields.io/badge/Express-404D59?logo=express&logoColor=white)](https://expressjs.com/) 
[![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/) 
[![Recoil](https://img.shields.io/badge/Recoil-20232A?logo=recoil&logoColor=blue)](https://recoiljs.org/) 

### Cloud Services
[![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?logo=amazon-s3&logoColor=white)](https://aws.amazon.com/s3/) 
[![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?logo=amazon-ec2&logoColor=white)](https://aws.amazon.com/ec2/) 
[![AWS Route 53](https://img.shields.io/badge/AWS_Route%2053-232F3E?logo=amazon-route53&logoColor=white)](https://aws.amazon.com/route53/) 

### Other Technologies
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) 
[![Notion API](https://img.shields.io/badge/Notion_API-000000?logo=notion&logoColor=white)](https://developers.notion.com/)

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
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/3ca70d7657f028de6c1511b6119732dd.jpg" alt="Login Screen" width="60%">
</div>

The user logs in by entering their KakaoTalk ID and password. If authenticated, the friend list is loaded for selection.

---

### **Message Composition**

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/ec0ffb8b5ff8c5c0db08a56db8277ce8.jpg" alt="Message Composition" width="60%">
</div>

Users can select a message template (text-only or text + image) and draft the desired content for broadcasting.

---

### **Bulk Messaging**

<div align="center">
  <img src="https://lukas-portfolio.s3.us-east-2.amazonaws.com/e18f42cc012da97e82040a225947bad9.jpg" alt="Bulk Messaging" width="60%">
</div>

Once the message is composed, users can confirm delivery and send it to all selected friends at once, saving significant time and effort.

---

## Features and Benefits

- **Efficient Communication**: Transition from one-on-one messaging to bulk notifications, saving up to **95% of the CEO’s time and effort**.  
- **Cross-Platform Compatibility**: Built with Electron, ensuring the app works seamlessly across different operating systems.  
- **Scalable Architecture**: Leveraged AWS (S3 & EC2) for secure data storage and efficient app scaling.  
- **Customizable Templates**: Pre-designed templates for text-only or text + image messages simplify the content creation process.  
- **Secure and Reliable**: Docker-based containerization ensures a consistent and secure runtime environment.  
