# 🏥 AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) system for Healthcare Professionals (HCPs) built using **React**, **FastAPI**, **LangGraph**, **Groq LLM**, and **MySQL**.

This project enables medical representatives to efficiently log interactions with healthcare professionals using either a structured form or an AI conversational interface.

---

## 🚀 Features

### 👨‍⚕️ HCP Management
- Add HCP
- Edit HCP
- Delete HCP
- Search HCP
- View HCP List

### 📝 Interaction Management
- Log HCP interactions
- Edit interactions
- View interaction history
- AI-assisted interaction logging

### 🤖 AI Features
- AI Chat Assistant
- AI Interaction Extraction
- Automatic Form Auto-fill
- AI Summary Generation
- Next Best Action
- Follow-up Recommendation
- HCP Sentiment Detection

---

## 🧠 LangGraph AI Agent

The application uses **LangGraph** to orchestrate AI workflows and tool execution.

### Implemented AI Tools

1. **Log Interaction Tool**
   - Logs HCP interactions
   - Generates AI Summary
   - Saves interaction into the database

2. **Edit Interaction Tool**
   - Updates existing interaction
   - Regenerates AI summary

3. **Search HCP Tool**
   - Searches HCPs by name

4. **Interaction History Tool**
   - Retrieves interaction history for an HCP

5. **Follow-up Recommendation Tool**
   - Generates AI recommendations
   - Suggests next actions
   - Creates follow-up plans

---

## 🛠 Tech Stack

### Frontend
- React
- Redux
- Material UI
- Axios

### Backend
- FastAPI
- SQLAlchemy
- Pydantic

### AI
- LangGraph
- LangChain
- Groq LLM

### Database
- MySQL

---

## 📂 Project Structure

```
ai-crm-hcp
│
├── backend
│   ├── app
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-CRM-HCP.git
```

---

## 2. Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## 3. Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Database

Create a MySQL database

```
ai_crm
```

Configure your `.env`

```
DATABASE_URL=mysql+pymysql://username:password@localhost/ai_crm

GROQ_API_KEY=YOUR_GROQ_API_KEY

MODEL_NAME=llama-3.3-70b-versatile
```

---

# AI Workflow

```
User
   │
   ▼
React UI
   │
   ▼
FastAPI
   │
   ▼
LangGraph Agent
   │
   ▼
Groq LLM
   │
   ▼
Structured JSON
   │
   ▼
Auto-fill Interaction Form
   │
   ▼
Save to MySQL
```

---

# API Endpoints

## HCP

```
GET /hcp
POST /hcp
PUT /hcp/{id}
DELETE /hcp/{id}
```

---

## Interaction

```
GET /interaction
POST /interaction
PUT /interaction/{id}
DELETE /interaction/{id}
```

---

## AI

```
POST /ai/chat
```

---

# Screenshots

## Dashboard

(Add Screenshot)

---

## HCP Management

(Add Screenshot)

---

## AI Assistant

(Add Screenshot)

---

## Interaction Form

(Add Screenshot)

---

## Interaction History

(Add Screenshot)

---

# Future Enhancements

- Voice to Text
- Email Generation
- PDF Report Export
- Calendar Integration
- Advanced Analytics

---

# Author

**Rajesh Chakali**

B.Tech CSE (AI & ML)

GitHub:
https://github.com/Rajesh-C01

LinkedIn:
https://linkedin.com/in/rajesh-chakali

---

# License

This project was developed as part of an AI CRM HCP technical assignment.
