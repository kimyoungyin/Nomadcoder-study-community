import { useEffect } from "react";
import Auth from "../../components/layout/Auth";

function Login() {
    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    return <Auth authType="login" title="Login to Nomad Study Community" />;
}

export default Login;
