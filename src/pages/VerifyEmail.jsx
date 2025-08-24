import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Sedang memverifikasi...");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`http://localhost:5000/users/verify/${token}`, {
        signal: controller.signal,
      })
      .then(() => setMessage("Email berhasil diverifikasi! Silakan login."))
      .catch((err) => {
        console.error("Gagal memverifikasi email:", err);
        setMessage("Token tidak valid atau sudah kedaluwarsa.");
      });

    return () => controller.abort();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-bold">{message}</h2>
    </div>
  );
}
