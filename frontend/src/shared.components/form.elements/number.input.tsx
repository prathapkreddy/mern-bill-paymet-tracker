import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';

export default function NumberInput(props: any) {
    const { label, placeholder, value, onChange } = props;

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor={label}>{label}</Label>
            <Input type="number" id={label} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}
