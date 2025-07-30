"use client"

return (
    <div className="" onClick={handleFlip}>
        {/* Front */}
        <div className="">
            <img src={image} alt="placeholder" className="" />
            <h2 className="">{name}</h2>
        </div>
        {/* Back */}
        <div className="">
            <h2 className="">{name}</h2>
            <p className="">{bio}</p>
            <button className="">{link}</button>
        </div>
    </div >
)