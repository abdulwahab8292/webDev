function Description({ description }) {
    if (!description) return null;
    
    return (
        <div>
            <h1 className="text-white opacity-60">{description}</h1>
        </div>
    );
}

export default Description;
