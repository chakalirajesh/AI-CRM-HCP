# AI-First CRM HCP Module

## Overview

AI-First CRM HCP Module is a Healthcare Professional (HCP) Customer Relationship Management system built for pharmaceutical field representatives. It enables users to manage HCP interactions using both a structured form and an AI-powered conversational interface.

The application uses LangGraph with Groq LLM to automate interaction logging, summarization, follow-up recommendations, and HCP information retrieval.

---

## Tech Stack

### Frontend

- React (Vite)
- Redux Toolkit
- Material UI
- Axios
- Google Inter Font

### Backend

- FastAPI
- LangGraph
- LangChain
- Groq LLM (gemma2-9b-it)
- SQLAlchemy

### Database

- MySQL

---

## AI Features

- AI Chat Interface
- AI Interaction Summary
- AI Follow-up Recommendation
- LangGraph Agent
- ReAct Agent

---

## LangGraph Tools

1. Log Interaction
2. Edit Interaction
3. Search HCP
4. Interaction History
5. Follow-up Recommendation

---

## Project Structure

```
frontend/
backend/
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

```
APP_NAME=AI First CRM HCP Module

HOST=127.0.0.1

PORT=8000

DB_HOST=localhost

DB_PORT=3306

DB_NAME=ai_crm

DB_USER=root

DB_PASSWORD=******

GROQ_API_KEY=YOUR_API_KEY

MODEL_NAME=gemma2-9b-it
```

---

## Assignment Features

✔ React UI

✔ Redux

✔ FastAPI

✔ LangGraph

✔ Groq LLM

✔ MySQL

✔ AI Chat

✔ Structured Form

✔ Interaction History

✔ Search HCP

✔ Follow-up Recommendation

✔ CRUD Operations

---

## Author

Rajesh Chakali
