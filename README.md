# NoteBoard Frontend (React)

A modern, responsive **React + TypeScript** frontend for the NoteBoard full-stack app.  
It features secure JWT token-based authentication, Google OAuth, OTP email login/signup, and clean note management with a responsive UI.

---

## Features

- React + TypeScript based frontend
- Google OAuth login via backend redirect
- Email + OTP signup/login flow
- JWT token management with localStorage
- Responsive dashboard with notes creation and deletion
- Protected routes (Dashboard guarded by token)
- Dropdown logout menu
- Consistent modern styling with CSS modules

---

## Folder Structure
```bash

frontend/
├── src/
│ ├── components/
│ │ ├── SignupForm.tsx
│ │ ├── SignInForm.tsx
│ │ ├── VerifyOTPForm.tsx
│ │ ├── NotesDashboard.tsx
│ │ └── GoogleLoginButton.tsx
│ ├── pages/
│ │ ├── HomePage.tsx
│ │ └── DashboardPage.tsx
│ ├── services/
│ │ └── api.ts # Axios API services
│ ├── styles/
│ │ ├── DashboardPage.css
│ │ ├── NotesDashboard.css
│ │ └── AuthForms.css
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── .env
└── package.json

```

---

## Environment Variables (`.env`)

Create a `.env` in `frontend/`:

```bash

REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

```

---

## Install & Run Frontend

```bash

cd frontend
npm install
npm start

```

# Frontend will run at:

```bash

http://localhost:3000

```