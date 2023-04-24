import React, { createContext, useState } from 'react';

// createContext를 사용하여 Context 생성
export const ApiContext = createContext();

// Provider 컴포넌트 생성
export const ApiProvider = ({ children }) => {
    const [isCallApi, setIsCallApi] = useState(false);

    const toggleIsCallApi = () => {
        setIsCallApi((prev) => !prev);
    };

    return (
        <ApiContext.Provider value={{ isCallApi, toggleIsCallApi }}>
            {children}
        </ApiContext.Provider>
    );
};

// Consumer 컴포넌트 생성
export const ApiConsumer = ApiContext.Consumer;