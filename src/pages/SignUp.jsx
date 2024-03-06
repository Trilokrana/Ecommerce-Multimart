import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Button,
  Label,
  Input,
} from "reactstrap";
import "../styles/Login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config/";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);

      uploadTask.snapshot?.ref.getDownloadURL().then(async (downloadURL) => {
        await updateProfile(user, {
          displayName: username,
          photoURL: downloadURL,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: username,
          email,
          photoURL: downloadURL,
        });
      });

      setLoading(false);
      toast.success("Account created successfully!");
      Navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong", error.message);
    }
  };
  

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw mb-4">SignUp</h3>
                <Form className="auth_form" onSubmit={signup}>
                  <FormGroup floating className="form_group">
                    <Input
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Label for="examplePassword">Username</Label>
                  </FormGroup>
                  <FormGroup floating className="form_group">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Label for="exampleEmail">Email</Label>
                  </FormGroup>
                  <FormGroup floating className="form_group">
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Label for="examplePassword">Password</Label>
                  </FormGroup>
                  <FormGroup className="form_group">
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="text-black"
                    />
                  </FormGroup>
                  <Button color="primary" size="lg" className="special mt-4">
                    Create an Account
                  </Button>
                  <h6 className="mt-2 text-white">
                    Already have an account ? <Link to="/login">Login</Link>
                  </h6>

                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
