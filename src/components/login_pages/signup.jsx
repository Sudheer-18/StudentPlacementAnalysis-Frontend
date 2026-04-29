import { useState, useRef } from 'react';
import './siginup.css';
import axios from 'axios';
import Webcam from "react-webcam";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaCamera } from 'react-icons/fa';

const Signup = () => {
  const webcamRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📸 capture
  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    setImage(img);
  };

  // base64 → file
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    if (!image) {
      return alert("Please capture photo!");
    }

    const file = dataURLtoFile(image, "photo.jpg");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("photo", file);

    try {
      await axios.post("http://localhost:5001/register", formData);
      alert("Signup successful!");
      window.location.href = "/signin";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="aiwise-wrapper">

        <div className="logo-title">
          <img src="https://cdn-icons-png.flaticon.com/512/3845/3845725.png" alt="logo" />
          <h1>AI <span>Wise 🤖</span></h1>
          <p>Join the AI revolution today</p>
        </div>

        <div className="auth-card">

          <div className="tabs">
            <button onClick={() => window.location.href = "/signin"}>Login</button>
            <button className="active">Sign Up</button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <FaUser />
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* 🎥 CAMERA */}
            <div className="camera-box">
              {!image ? (
                <>
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam"
                  />
                  <button type="button" className="capture-btn" onClick={capture}>
                    <FaCamera /> Capture
                  </button>
                </>
              ) : (
                <>
                  <img src={image} alt="preview" className="preview-img" />
                  <button type="button" className="retake-btn" onClick={() => setImage(null)}>
                    Retake
                  </button>
                </>
              )}
            </div>

            <button type="submit" className="enter-btn">
              🤖 Join AI Wise →
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;