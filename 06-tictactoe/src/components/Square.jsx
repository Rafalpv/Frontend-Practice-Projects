export function Square({ children, isSelected, upadateBoard, index }) {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handlerClick = () => {
        upadateBoard(index)
    }

    return (
        <button onClick={handlerClick} className={className} >
            {children}
        </button>
    );
}