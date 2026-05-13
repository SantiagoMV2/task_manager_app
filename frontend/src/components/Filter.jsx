const Filter = ({ handleFilterChange }) => {
    return(
        <>
            Search: <input onChange={handleFilterChange} />
        </>
    )
}

export default Filter