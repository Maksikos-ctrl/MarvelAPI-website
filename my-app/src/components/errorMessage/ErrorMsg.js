const ErrorMsg = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'}></img>
        <img style={{ display: 'block', width: '550px', height: '260px', objectFit: 'fill', margin: "0 auto"}}  src="https://http.dog/500.jpg" alt="Error" />
    );
};

export default ErrorMsg;