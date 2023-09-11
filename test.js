import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load the reCAPTCHA script and initialize it when it's ready
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY";

    script.onload = () => {
      window.grecaptcha.ready(() => {
        // reCAPTCHA is ready, you can now use grecaptcha.execute
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script tag if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Execute reCAPTCHA and obtain a token
      window.grecaptcha
        .execute("YOUR_RECAPTCHA_SITE_KEY", { action: "submit" })
        .then((token) => {
          setRecaptchaToken(token);

          // Send the name and reCAPTCHA token to the backend for verification
          axios
            .post("/verify", { name, recaptchaToken: token })
            .then((response) => {
           //

           
            });
        });
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <h2>Form with reCAPTCHA</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div
          className="g-recaptcha"
          data-sitekey="YOUR_RECAPTCHA_SITE_KEY"
          data-action="submit"
        ></div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Form;
