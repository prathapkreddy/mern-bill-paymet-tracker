export default function CancelButton(props: any) {
    const { onClick, label } = props;

    return (
        <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg" onClick={onClick}>
            {label}
        </button>
    );
}
