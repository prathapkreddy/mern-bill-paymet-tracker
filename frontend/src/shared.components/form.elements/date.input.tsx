export default function DateInput(props: any) {

    const { label, value, onChange } = props;

    return <div className="mb-4">
        <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor={label}
        >
            {label}
        </label>
        <input
            type="date"
            id={label}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
    </div>;

}