import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fb";

const ThreadEditor = ({ match, history }) => {
    const [threadObj, setThreadObj] = useState(null);
    const threadId = match.params.docId;
    const threadRef = doc(db, "threads", threadId);
    useEffect(() => {
        const fetchPrevData = async () => {
            const threadObj = await getDoc(doc(db, "threads", threadId));
            if (threadObj.exists()) {
                setThreadObj(threadObj.data());
            }
        };
        fetchPrevData();
    }, [threadId]);

    const threadEditFormHandler = async (newObj) => {
        if (newObj.content.trim() !== threadObj.content.trim()) {
            await updateDoc(threadRef, {
                content: newObj.content,
            });
            history.push(`/thread/${threadId}`);
        }
    };

    return (
        <>{threadObj ? <div>가져옴</div> : <div>아직 가져오고 있습니다</div>}</>
    );
};

export default ThreadEditor;
