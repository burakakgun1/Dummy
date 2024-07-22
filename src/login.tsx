import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './store';
import { loginUser } from './loginSlice';

interface LoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginForm>({
        username: "",
        password: "",
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted with data:", formData);

        try {
            await dispatch(loginUser(formData));
            navigate('/mainpage');
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className='my-3'
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='my-3'
                    />
                </Form.Group>

                <Button className="btn-lg my-3" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
