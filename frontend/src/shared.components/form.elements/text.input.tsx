import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';

export default function TextInput(props: any) {
    const { label, placeholder, value, onChange, disabled } = props;

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor={label}>{label}</Label>
            <Input type="text" id={label} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
        </div>
    );
}
