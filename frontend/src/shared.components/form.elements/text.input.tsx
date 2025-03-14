export default function TextInput(props: any) {
    const { label, placeholder, value, onChange, disabled } = props;

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor={label}>
                {label}
            </label>
            <input value={value} onChange={onChange} type={'text'} id={label} placeholder={placeholder} disabled={disabled} className={'w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'} />
        </div>
    );
}
