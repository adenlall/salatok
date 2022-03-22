import Clock from "./Clock";

function ChSal(props) {
    return ( 
        <div className="flex w-full items-center content-center justify-center">
            
                <Clock cc={props.cc} ss={props.ss}/>
            </div>
     );
}

export default ChSal;