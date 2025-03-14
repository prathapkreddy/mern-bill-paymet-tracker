export default function SubmitButton(props: any) {
    const { label } = props;

    return (
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
            {label}
        </button>
    );
}
