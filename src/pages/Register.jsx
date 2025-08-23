import Header from "../components/Header";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm();
    
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const newUser = {
                name: data.name,
                email: data.email,
                jenis_kelamin: data.jenisKelamin,
                no_hp: data.phone,
                kata_sandi: data.kata_sandi
            };

            await api.post("/users", newUser);
            alert("Akun berhasil dibuat!");
            navigate("/Login");
        }
        catch (err) {
            console.error("Gagal membuat akun:", err);
            alert("Gagal membuat akun, silahkan coba lagi!");
        }
    }

    return (
        <>
        <Header />
        <main>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="masuk-ke">
                    <h1>Pendaftaran Akun</h1>
                    <p>Yuk, daftarkan akunmu sekarang juga!</p>
                </div>
                <div className="form-group">
                    <FormInput
                        id="name"
                        label="Nama Lengkap"
                        register={register}
                        errors={errors} />
                    <FormInput
                        id="email"
                        label="E-Mail"
                        type="email"
                        register={register}
                        errors={errors} />
                    <FormSelect
                        id="jenisKelamin"
                        label="Jenis Kelamin"
                        options={["Laki-Laki", "Perempuan"]}
                        register={register}
                        errors={errors} />
                    <FormInput
                        id="phone"
                        label="No. Hp"
                        type="number"
                        register={register}
                        errors={errors} />
                    <FormInput
                        id="kata_sandi"
                        label="Kata Sandi"
                        type="password"
                        register={register}
                        errors={errors} 
                        validate={(value) =>
                            value.length >= 6 || "Kata sandi minimal 6 karakter"
                        }/>
                    <FormInput
                        id="konfirmasiPassword"
                        label="Konfirmasi kata Sandi"
                        type="password"
                        register={register}
                        errors={errors}
                        validate={(value) => value === getValues("kata_sandi") || "Kata sandi tidak cocok!"}/>
                        
                    <div className="forgot-password">
                        <button type="button" className="forgot-password">Lupa Password?</button>
                    </div>
                    <button type="submit" className="btn">Daftar</button>
                    <button type="button" className="btn" onClick={() => navigate("/Login")}>Masuk</button>
                    <div className="divider">atau</div>
                    <button type="button" className="google-btn">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="google-logo"/>Daftar dengan Google
                    </button>
                </div>
            </form>
        </main>
        </>
    );
}