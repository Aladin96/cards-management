import React, {useRef, useState} from 'react';

const useFullScreen = () => {
    const [fullEnable ,setFullEnable] = useState(false);

    const fullScreenToggle = () => {
        setFullEnable(!fullEnable);
    }
    return fullEnable;
}
 
export default useFullScreen;