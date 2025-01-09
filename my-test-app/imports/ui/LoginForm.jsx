import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();

        // Meteor.loginWithPassword(username, password);
        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                console.error("Login failed:", error); // 오류 메시지 출력
                alert("Login failed: " + error.reason); // 사용자에게 에러 메시지 표시
            } else {
                console.log("Login successful");
            }
        });
    };

    return (
        <form onSubmit={submit} className="login-form">
            <div>
                <label htmlFor="username">Username</label>

                <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>

                <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
};