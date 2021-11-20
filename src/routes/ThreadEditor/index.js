import { doc, getDoc, updateDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import EditorForm from "../../components/Editor/EditorForm";
import Loader from "../../components/Loader";
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
                isPinned: newObj.isPinned,
                content: newObj.content,
            });
            history.push(`/thread/${threadId}`);
        }
    };
    return (
        <>
            {threadObj ? (
                <EditorForm
                    isPost={false}
                    onSubmit={threadEditFormHandler}
                    prevData={threadObj}
                />
            ) : (
                <Loader /> // Loader를 따로 createPortal로 다른 root에서 렌더링되게 하는 건 어떨까요?
            )}
        </>
    );
};

export default ThreadEditor;
