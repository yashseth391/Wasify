# Wasify - Real-time Waste Classification and Management

**Wasify** is a mobile application designed to improve waste management by using machine learning to classify waste into 12 distinct categories. The app leverages the power of YOLO-based object detection for real-time waste classification, providing users with accurate sorting capabilities to promote recycling and reduce environmental waste.

## Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Supabase (Database)
- **Authentication:** Kinde
- **Object Detection:** YOLO (You Only Look Once)
- **Machine Learning:** PyTorch (Converted to TFLite for Mobile Inference)
- **Cloud Hosting:** Render (for deploying the model and backend)

## Features

- **Real-time Waste Classification:** Uses YOLO-based object detection to classify waste into 12 categories, helping users manage their waste efficiently.
  
- **Efficient Mobile AI Inference:** The app is optimized to run machine learning models on mobile devices, ensuring smooth and real-time classification with minimal computational load.

- **User-Friendly Interface:** The app allows users to take pictures of waste items, which are instantly classified for proper disposal and recycling.

- **Waste Management Guidance:** Provides feedback on how to dispose of waste properly, contributing to more sustainable recycling practices.

## Installation

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/yashseth391/Wasify.git
cd Wasify
