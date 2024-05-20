// it is a tag created in react
const SingleStudent = ({address, name}) => {
    return ( 
    <div>
        <h1>{name}</h1>
        <p>{address}</p>
    </div>
    );
};

// each function can only return a single (one) tag not more than one. here it is div tag
export default SingleStudent;