import { useState } from "react";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        if ( nweet === ""){
            return;
        }

        let attachmentUrl = "";
        if ( attachment !== ""){

            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            // console.log("파일 업로드 응답:", await getDownloadURL(response.ref));
            attachmentUrl = await getDownloadURL(response.ref);
            // 파일이 성공적으로 업로드되었을 때 추가 작업을 수행할 수 있습니다.
        }
            await addDoc(collection(dbService,"nweets"),{
                text: nweet,
                createdAt : Date.now(),
                creatorId: userObj.uid,
                attachmentUrl,
            });
            setNweet(""); 
            setAttachment("");
    
    };
 

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
       const{
        target: { files },
       } = event;
       const theFile = files[0];
       const reader = new FileReader();
       reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
       };

       if (Boolean(theFile)){

           reader.readAsDataURL(theFile);
       }

    };

    const onClearAttachment = () => setAttachment("");




    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />

                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity:0,
                    
                }}
            />  
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                     src={attachment} 
                     style={{
                        backgroundImage: attachment,
                     }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>

                </div>
            )}  
    </form>
    );


};

export default NweetFactory;