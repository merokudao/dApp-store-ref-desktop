export const Card = (props) => {
    return (
        <div className="card p-4 w-full h-full bg-card-bg border border-gray-700 rounded-card-radius">
            {props.children}
        </div>
    )
}