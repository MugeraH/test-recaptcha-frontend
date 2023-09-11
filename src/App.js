// import logo from "./logo.svg";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import React from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// import { config } from "./config";
// import axios from "axios";

// import ReactRecaptcha3 from "react-google-recaptcha3";

// function App() {
//   const [userEmail, setUserEmail] = React.useState("");
//   const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);
//   const [recaptchaToken, setRecaptchaToken] = React.useState("");
//   const [isLoading, setIsLoading] = React.useState(false);

//   React.useEffect(() => {
//     const loadRecaptchaScript = () => {
//       // Load the reCAPTCHA script dynamically
//       const script = document.createElement("script");
//       script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_SITE_KEY}`;

//       script.async = true;

//       script.onload = () => {
//         // reCAPTCHA script has loaded, initialize it
//         window.grecaptcha.ready(() => {
//           // reCAPTCHA is ready, you can now use grecaptcha.execute
//         });
//       };

//       document.body.appendChild(script);
//     };

//     // Call the function to load the reCAPTCHA script when the component mounts
//     loadRecaptchaScript();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       window.grecaptcha
//         .execute(process.env.REACT_APP_SITE_KEY, {
//           action: "submit",
//         })
//         .then((token) => {
//           setRecaptchaToken(token);
//           setIsLoading(false);

//           console.log(token);

//           // Send the name and reCAPTCHA token to the backend for verification
//           axios
//             .post(`http://localhost:2000/post`, {
//               inputVal: userEmail,
//               token,
//             })
//             .then((response) => {
//               console.log("success", response);
//             })
//             .catch((error) => console.log(error));
//           // });
//         });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       // @ts-ignore
//       window.grecaptcha.reset();
//     }
//   };
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "",
//         flexDirection: "column",
//         height: "100vh",
//       }}
//     >
//       <Box sx={{ margin: "20px 0px" }}>
//         <Typography>Home</Typography>
//       </Box>
//       <form onSubmit={handleSubmit}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             background: "",
//             width: "600px",
//           }}
//         >
//           <TextField
//             type="text"
//             value={userEmail}
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//           <>{/* <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} /> */}</>
//           {/* <div
//             style={{ display: "none" }}
//             className="g-recaptcha"
//             data-sitekey={process.env.REACT_APP_SITE_KEY}
//             data-action="submit"
//           ></div> */}

//           <ReCAPTCHA
//             sitekey={process.env.REACT_APP_SITE_KEY}
//             onChange={(token) => setRecaptchaToken(token ?? "")}
//             data-action="submit"
//           />

//           {isLoading ? (
//             <>
//               {" "}
//               <Button variant="contained" color="success">
//                 <CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
//               </Button>
//             </>
//           ) : (
//             <Button type="submit" variant="contained" color="success">
//               Submit
//             </Button>
//           )}
//         </Box>
//       </form>
//     </Box>
//   );
// }

// export default App;

import ReactRecaptcha3 from "react-google-recaptcha3";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    ReactRecaptcha3.init("6Lde1O8nAAAAAD6_Nd5xOorxh75Ga2hx3eAoDXra").then(
      (status) => {
        console.log(status);
      }
    );
  }, []);

  const submit = () => {
    ReactRecaptcha3.getToken().then((resp) => {
      // console.log(resp);
      setToken(resp);

      axios
        .post(`http://localhost:2000/post`, {
          inputVal: name,
          token: resp,
        })
        .then((response) => {
          console.log("success", response);
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="App">
      <h1>React recaptcha3</h1>
      <div>
        <p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={submit}>Submit</button>
        </p>
        <div>
          <p>
            Token is <b>{token}</b>
          </p>
          <p>name: {name}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
