import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import api from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

export default function Login () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { loading, error, isLoggedIn } = useSelector((state) => state.auth);
    
    const onSubmit = async (data) => {
        try {
            console.log ('Data dikirim ke server:', data);

            const response = await api.post('/users/login', {
                email: data.email,
                kata_sandi: data.kata_sandi
            });
            
            console.log("Login berhasil!", response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate("/Beranda");
        } catch(error) {
                console.error("Gagal login:",error.response?.data || error.message);
            }
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
                            id="kata_sandi"
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