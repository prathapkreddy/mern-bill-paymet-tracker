export default function NumberInput(props: any) {
    const { label, placeholder, step, value, onChange } = props;

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="number">
                {label}
            </label>
            <input value={value} onChange={onChange} type="number" id="number" step={step} placeholder={placeholder} className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        </div>
    );
}
