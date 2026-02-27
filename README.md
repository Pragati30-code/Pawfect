# Pawfect 🐾

An AI-powered veterinary assistant that lets pet owners ask questions about their pet's health and get instant, intelligent responses — available anytime, from anywhere.

---

## What it does

Pawfect is a chat-based web app where users can describe their pet's symptoms, ask nutrition questions, understand behavior, and get guidance on when to seek professional care. It's not a replacement for a vet — it's the knowledgeable friend you wish you had at 2am when your dog won't stop scratching.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Java 17, Spring Boot 3, Maven |
| AI | Groq API — GPT OSS 120B |
| Auth | JWT with Spring Security |
| Database | PostgreSQL via NeonDB |
| HTTP Client | Java built-in HttpClient |

---

## How it works

**Authentication** is handled entirely on the backend using Spring Security. Passwords are hashed with BCrypt and never stored in plain text. On login or register, the server issues a signed JWT which the frontend stores locally and attaches to every subsequent request.

**The chat** works statelessly — the frontend maintains the full conversation history in memory and sends it with every message. This gives the AI full context of the conversation without requiring the backend to persist chat history. The backend forwards the message list to Groq's API along with a veterinary system prompt, then streams the response back to the user.

**The AI** is OpenAI's open source model running on Groq's inference infrastructure, accessed via an OpenAI-compatible endpoint. The system prompt instructs it to behave as a warm, knowledgeable vet assistant and always recommend professional consultation for serious concerns.

---

## Project Structure

```
pawfect/
├── backend/                  Spring Boot API
│   ├── config/               Security & CORS configuration
│   ├── controller/           Auth and Chat REST endpoints
│   ├── dto/                  Request and response shapes
│   ├── entity/               User database model
│   ├── repository/           Database access layer
│   ├── security/             JWT filter and utilities
│   └── service/              Auth logic and Groq API integration
│
└── frontend/                 Next.js application
    ├── app/                  Pages — login, register, chat
    ├── components/ui/        shadcn component library
    ├── lib/                  API client and session helpers
    └── types/                Shared TypeScript interfaces
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new account |
| POST | `/api/auth/login` | Public | Sign in, receive JWT |
| POST | `/api/chat` | Protected | Send messages, get AI response |

---

## Upcoming Features

- **Chat history persistence** — save and revisit past conversations
- **Pet profiles** — add your pets with species, breed, and age for more personalized answers
- **Symptom checker** — a guided flow for common symptoms with triage guidance
- **Multiple AI models** — let users choose between faster or more capable models
- **Mobile app** — React Native client using the same backend
- **Vet referral integration** — connect users with nearby licensed vets when needed
- **Multi-language support** — answer questions in the user's preferred language

---

## Disclaimer

Pawfect provides general information only and is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult a licensed veterinarian for medical concerns about your pet.