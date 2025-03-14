import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

export default function SelectInput(props: any) {
    const { label, options, value, onChange, placeholder } = props;

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor={label}>{label}</Label>
            <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options &&
                            options.map((option: any) => {
                                return (
                                    <SelectItem value={option} key={option}>
                                        {option}
                                    </SelectItem>
                                );
                            })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
