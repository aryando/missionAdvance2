import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import api from "../services/api";
export default function Login () {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        api.get("/users")
        .then(res => {
            const users = res.data;
            const user= users.find(u => u.email === data.email && u.password === data.password);

            if(!user) {
                alert("Email atau kata sandi salah!");
                return;
            }
            localStorage.setItem("isLogin", true);
            localStorage.setItem("user", JSON.stringify(user));
            alert("Login berhasil!");
            navigate("/Beranda");
        })
        .catch(err => {
            console.error("Gagal login:",err);
            alert("Gagal login, silahkan coba lagi!");
        })
        
    };
    return (
        <>
        <Header />
        <main>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="masuk-ke">
                    <h1>Masuk ke Akun</h1>
                    <p>Yuk, lanjutin belajarmu di videobelajar.</p>
                </div>
                <div className="form-group">
                        <FormInput
                            id="email"
                            label="E-Mail"
                            type="email"
                            register={register}
                            errors={errors}
                        /> 

                        <FormInput
                            id="password"
                            label="Kata Sandi"
                            type="password"
                            register={register}
                            errors={errors}
                        />
                    <div className="forgot-password">
                        <button type="button" className="forgot-password">Lupa Password?</button>
                    </div>
                    <button type="submit" className="btn">Masuk</button>
                    <button type="button" className="btn" onClick={() => navigate("/register")}>Daftar</button>
                    <div className="divider">atau</div>
                    <button type="button" className="google-btn"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="google-logo"/>Masuk dengan Google</button>
                </div>
            </form>
        </main>
        </>
    )
}