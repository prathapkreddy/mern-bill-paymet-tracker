import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';

export default function TextInput(props: any) {
    const { label, placeholder, value, onChange, disabled } = props;

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={label}>{label}</Label>
            <Input type="text" id={label} placeholder={placeholder} value={value} className="col-span-3" onChange={onChange} disabled={disabled} />
        </div>
    );
}
