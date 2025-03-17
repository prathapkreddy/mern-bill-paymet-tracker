import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';

export default function NumberInput(props: any) {
    const { label, placeholder, value, onChange } = props;

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={label}>{label}</Label>
            <Input type="number" className="col-span-3" id={label} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}
