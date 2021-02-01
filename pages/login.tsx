import { useState } from 'react';
import useUser from 'lib/useUser';
import fetchJson from 'lib/fetchJson';

const Login = () => {
    // here we just check if user is already logged in and redirect to profile
    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    });

    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            username: e.currentTarget.username.value,
        };

        try {
            await mutateUser(
            fetchJson("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }),
            );
        } catch (error) {
            console.error("An unexpected error happened:", error);
            setErrorMessage(error.data.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
    
        <button type="submit">Login</button>
    
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form> 
    );
};

export default Login;
