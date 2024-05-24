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
        //  let newEven=[];
        //  let newOdd=[];
        //  let newRes=[];
        //  for(let i=0;i<responseArray.length;i++)
        //          {
        //             if(i===0 || i%2 !== 1){
        //                 newEven.push(responseArray[i]);
        //              }
        //              else{
        //                 newOdd.push(responseArray[i]);
        //             }}
        // let newOddBold=newOdd.map((x)=>{
        //     return <b> {x} </b>
        // })
        // for(let i=0;i<responseArray.length;i++)
        //     {
        //        if(i===0 || i%2 !== 1){
        //            newRes[i]=newEven.shift();
        //         }
        //         else{
        //             newRes[i]=newOddBold.shift();
        //         }}

        //    let newResponse=newRes.join(" ");

        //     let newRes2=newResponse.split("*").map((newLine)=>{
        //         return <p> {newLine} </p>})

         let newResponse="";

         for(let i=0;i<responseArray.length;i++)
             {
                if(i===0 || i%2 !== 1){
                    newResponse+=responseArray[i];
                 }
                 else{
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
