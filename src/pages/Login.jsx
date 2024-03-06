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
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success("Successfully logged in");
      Navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error);
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
                <h3 className="fw mb-4">LogIn</h3>
                <Form className="auth_form" onSubmit={signIn}>
                  <FormGroup floating className="form_group ">
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
                  <Button color="primary" size="lg" className="special mt-2">
                    Login
                  </Button>
                  <h6 className="mt-2 text-white">
                    Don't have an account ? <Link to="/Signup">SignUp</Link>
                  </h6>
                  <hr className="text-white"></hr>
                  <Button
                    color="success"
                    size="lg"
                    className="special"
                    onClick={handleGoogleSignIn}
                  >
                    <i class="ri-google-fill m-2"></i>
                    Sign in with Google
                  </Button>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
