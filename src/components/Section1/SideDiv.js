function SlideDiv() {

    return (
        <>
            <div className="lg:w-1/2 w-full shadow-xl rounded-lg" style={{ background: 'url("https://i.redd.it/5rvq4jod8a4z.jpg") center center / cover ', backgroundRepeat: 'no-repeat' }} >
                <div className="flex flex-col h-full items-center lg:py-4 py-12 justify-between rounded-lg text-slate-100" style={{ background: 'linear-gradient(181deg, black, transparent)' }} >
                      <div className="h-[100%] flex items-center justify-center">
                           <div className="loader">
                               <div className="outer"></div>
                               <div className="middle"></div>
                               <div className="inner"></div>
                           </div>
                      </div>
                </div>
            </div>
        </>
    );
}

export default SlideDiv;
