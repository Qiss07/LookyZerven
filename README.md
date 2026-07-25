# LookyZerven

A web-based steganography application that allows users to securely hide and extract secret text messages inside images using Least Significant Bit (LSB) steganography with optional AES encryption.

---

## Features

- Hide secret text messages inside images
- Extract hidden messages from encoded images
- Optional AES password encryption
- LSB (Least Significant Bit) steganography
- Modern and responsive user interface
- Client-side processing (no server required)

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- CryptoJS
- React Router
- shadcn/ui

---

## Project Structure

```text
src/
├── components/
├── hooks/
├── lib/
├── pages/
├── test/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Qiss07/LookyZerven.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## How It Works

### Encode

1. Upload an image.
2. Enter a secret message.
3. (Optional) Add an encryption password.
4. Generate the encoded image.

### Decode

1. Upload the encoded image.
2. Enter the password (if required).
3. Extract the hidden message.

---

## License

This project is licensed under the MIT License