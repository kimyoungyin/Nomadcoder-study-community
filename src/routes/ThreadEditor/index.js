import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fb";

const ThreadEditor = ({ match }) => {
    const [threadObj, setThreadObj] = useState(null);
    const threadId = match.params.docId;
    useEffect(() => {
        const fetchPrevData = async () => {
            const threadObj = await getDoc(doc(db, "threads", threadId));
            if (threadObj.exists()) {
                setThreadObj(threadObj.data());
            }
        };
        fetchPrevData();
    }, []);
    return (
        <>{threadObj ? <div>가져옴</div> : <div>아직 가져오고 있습니다</div>}</>
    );
};

export default ThreadEditor;
