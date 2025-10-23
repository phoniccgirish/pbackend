import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const projects = [
  {
    id: 1,
    title: "Weather Web App",
    description:
      "Developed a weather application using an external API to display real-time data with a responsive UI.", // [cite: 13, 19, 20]
    tags: ["React", "JavaScript", "API", "HTML", "CSS"], // [cite: 6, 8]
    imageUrl: "/images/n.png",
    githubUrl: "https://github.com/your-username/weather-app",
    liveUrl: "https://your-weather-app.com",
  },
  {
    id: 2,
    title: "Tic Tac Toe Game",
    description:
      "Built an interactive Tic Tac Toe game with dynamic game logic and a clean, responsive design.", // [cite: 12, 15, 16]
    tags: ["React", "JavaScript", "HTML", "CSS", "Game Logic"], // [cite: 6, 8]
    imageUrl: "/images/project-tic-tac-toe.jpg",
    githubUrl: "https://github.com/your-username/tic-tac-toe",
    liveUrl: "https://your-tic-tac-toe.com",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "A personal portfolio website (like this one!) to showcase my skills and projects to potential employers.", // [cite: 13, 17, 18]
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"], // [cite: 8]
    imageUrl: "/images/project-portfolio.jpg",
    githubUrl: "https://github.com/your-username/portfolio",
    liveUrl: "https://your-portfolio.com",
  },
];

const submittedContacts = [];
router.get("/projects", (req, res) => {
  try {
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please fill out all fields." });
  }

  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  submittedContacts.push(newContact);
  console.log("New contact form submission saved:", newContact);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptionsToYou = {
    from: process.env.EMAIL_USER,
    to: process.env.YOUR_EMAIL, // Reads from .env
    subject: `Portfolio Contact: New Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };
  const mailOptionsToSender = {
    from: process.env.EMAIL_USER,
    to: email, // The sender's email
    subject: `Thank you for contacting Girish Yadav!`,
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br>Girish Yadav</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);
    res
      .status(200)
      .json({ msg: "Message sent successfully! I will get back to you soon." });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ msg: "Failed to send message. Please try again later." });
  }
});

export default router;
