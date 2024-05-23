import { createContext,useState } from "react";
import run from "../config/gemini";


export const Context = createContext();



const ContextProvider=(props)=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat=()=>{
        setLoading(false);
        setShowResult(false);

    }

    
    
    

    const onSent =async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response= await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input);
            response = await run(input);
        }
        
        
       
         let responseArray= response.split("**");
         let newResponse="";
         
        
         for(let i=0;i<responseArray.length;i++)
             {
                if(i===0 || i%2 !== 1){
                    
                     newResponse+=responseArray[i];
                 }
                 else{
                //     responseArray.map((x)=>{
                //         if(i%2!==0){
                //             return {newResponse}={newResponse} + <strong>{responseArray[i]}</strong>
                //         }
                        
                //  })
                   
                newResponse+=responseArray[i];
                    
                    
                   

           }}
           
            let newRes2=newResponse.split("*").map((newLine)=>{
                return <p> {newLine} </p>
            })
            
             

            

        setResultData(newRes2)
        setLoading(false)
        setInput("")
    }

    // onSent("what is www")


    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
}
    return(
        
             <Context.Provider value={contextValue}>
                {props.children}
             </Context.Provider>
    )

    
}
export default ContextProvider;
