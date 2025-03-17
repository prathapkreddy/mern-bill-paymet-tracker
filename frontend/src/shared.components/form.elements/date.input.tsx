import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label.tsx';

export default function DateInput(props: any) {
    const { label, value, onChange } = props;

    return (
        <div className={'grid grid-cols-4 items-center gap-4'}>
            <Label htmlFor={label}>{label}</Label>
            <div className="col-span-3">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className={cn('w-[100%] justify-start text-left font-normal', !value && 'text-muted-foreground')}>
                            <CalendarIcon />
                            {value ? format(value, 'PPP') : <span>{label}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                        <div className="rounded-md border">
                            <Calendar mode="single" selected={value} onSelect={onChange} />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
