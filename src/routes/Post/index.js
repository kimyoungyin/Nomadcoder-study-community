import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { dbService } from "../../fb";
import EditorForm from "../../components/Editor/EditorForm";

function Post() {
    const history = useHistory();
    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    const postHandler = async (thread) => {
        await dbService.collection("threads").add(thread);
        history.push("/");
    };

    return <EditorForm isPost={true} onSubmit={postHandler} />;
}

export default Post;
