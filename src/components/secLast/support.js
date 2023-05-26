function Support() {
    return (
        <>
            <div className="rounded-lg shadow-lg lg:h-80 h-96 m-0 w-full" style={{ background: 'url("https://iris.ai/wp-content/uploads/2019/05/code-coder-codes-2194062-1.jpg") center / cover' }}>
                <div className=" lg:py-8 py-20 flex rounded-lg space-y-16 flex-col items-center justify-center lg:h-80 h-96  content-center dark:bg-[linear-gradient(174deg,#0000009e,transparent)] bg-[linear-gradient(198deg,#c0fdfebd,transparent)]">
                    <h1 className="text-4xl font-bold text-white mx-8">It's Open Source and Free, Support Us : </h1>
                    <div className="flex space-x-2 items-center">
                        <a rel="nofollow" href="https://www.github.com/adenlall/salatok">
                            <button className="btn btn-outline border-black bg-transparent hover:bg-white text-white">
                                GitHub
                            </button>
                        </a>
                        <a rel="nofollow" href="https://www.patreon.com/adenlall">
                        <button className="btn border-black bg-cyan-400 hover:bg-cyan-300 text-black">
                            Patreon
                        </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Support;
