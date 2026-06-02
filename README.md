# 💍 Wedding RSVP — Next.js + Firebase

A minimal, elegant RSVP web app. Guests submit their response, you get a real-time admin dashboard.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Database | Firebase Firestore |
| Server | Firebase Admin SDK |
| Email | Resend |
| Deploy | Vercel |

---

## Step-by-Step Setup

### Step 1 — Install dependencies

```bash
npm install
```

---

### Step 2 — Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it (e.g. `wedding-rsvp`) → Continue
3. Disable Google Analytics (optional) → **Create project**

#### Enable Firestore
1. In the sidebar → **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll secure it later) → select a region → **Enable**

#### Get your client SDK config
1. In Project Overview → click the **</>** (Web) icon to add a web app
2. Register app → copy the `firebaseConfig` object values

#### Get your Admin SDK credentials
1. Project Settings → **Service Accounts** tab
2. Click **Generate new private key** → download the JSON file
3. You'll find `project_id`, `client_email`, and `private_key` inside

---

### Step 3 — Set up Resend (email confirmations)

1. Sign up at [https://resend.com](https://resend.com)
2. **API Keys** → Create API Key → copy it
3. **Domains** → Add and verify your domain (or use `onboarding@resend.dev` for testing)

---

### Step 4 — Configure environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in every value:

```env
# From Firebase Console → Project Settings → Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# From downloaded service account JSON
FIREBASE_ADMIN_PROJECT_ID=your-project
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# From Resend dashboard
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=rsvp@yourdomain.com

# Choose any password to protect /admin
ADMIN_PASSWORD=YourSecurePassword123
```

> ⚠️ The `FIREBASE_ADMIN_PRIVATE_KEY` must keep `\n` as literal `\n` inside the quotes — do not convert to real newlines.

---

### Step 5 — Personalise the wedding details

Open these files and update the names, date, and location:

| File | What to update |
|---|---|
| `src/app/page.tsx` | Names, date, location, reply deadline |
| `src/app/layout.tsx` | Page title and description |
| `src/app/api/rsvp/route.ts` | Email subject lines, body text |
| `src/app/admin/page.tsx` | Admin heading |

---

### Step 6 — Run locally

```bash
npm run dev
```

- RSVP form → [http://localhost:3000](http://localhost:3000)
- Admin dashboard → [http://localhost:3000/admin](http://localhost:3000/admin)

---

### Step 7 — Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [https://vercel.com](https://vercel.com) → **New Project** → Import your repo
3. In **Environment Variables**, add every variable from `.env.local`
4. Click **Deploy** — done! 🎉

---

## Firestore Data Structure

Each RSVP is stored as a document in the `rsvps` collection:

```
/rsvps/{docId}
  name:            string        "Siti Rahimah"
  email:           string        "siti@email.com"
  attending:       "yes" | "no"
  guestCount:      number        2
  mealPreference:  string        "chicken" | "fish" | "vegetarian"
  notes:           string        "No shellfish please"
  submittedAt:     Timestamp
```

---

## Firestore Security Rules (set before going live)

In Firebase Console → Firestore → **Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{docId} {
      // Anyone can submit (create), nobody can read/edit/delete from client
      allow create: if request.resource.data.keys().hasAll(['name','email','attending'])
                    && request.resource.data.name is string
                    && request.resource.data.email is string;
      allow read, update, delete: if false;
    }
  }
}
```

---

## Project File Structure

```
wedding-rsvp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # RSVP page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── admin/
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   └── login/page.tsx    # Admin login
│   │   └── api/
│   │       ├── rsvp/route.ts     # POST /api/rsvp
│   │       └── admin/
│   │           └── login/route.ts
│   ├── components/
│   │   └── RsvpForm.tsx          # Client-side form
│   └── lib/
│       ├── firebase.ts           # Client SDK
│       ├── firebase-admin.ts     # Admin SDK
│       └── schema.ts             # Zod validation
├── .env.local.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```
