import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }

    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create newAccount
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
        
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email" 
                    placeholder="Enter your email." 
                    required 
                    value={email}
                    onChange={onChange}
                    />
                <input
                    name="password"
                    type="password" 
                    placeholder="Enter your password." 
                    required
                    value={password}
                    onChange={onChange}
                    />
                <input type="submit" value={newAccount ? "Create Account" : "Login"}/>
            </form>
            <div>
                <button>Continue With Google</button>
                <button>Continue With Github</button>
            </div>
        </div>

    );
};

export default Auth;