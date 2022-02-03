import { useEffect } from "react";
import Auth from "../../components/layout/Auth";

function Join() {
    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    return <Auth authType="join" title="Join Nomad Study Community" />;
}

export default Join;
