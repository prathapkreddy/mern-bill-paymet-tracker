export default function SelectInput(props: any) {

    const { label, options, value, onChange } = props;

    return <div className="mb-4">
        <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="cardType"
        >
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            id="cardType"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
            {
                options && options.map((option: any) => {
                    return <option key={option} value={option}>{option}</option>;
                })
            }

        </select>
    </div>;
}