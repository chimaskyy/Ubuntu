/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shippingZones } from "@/lib/Shipping";

export function SelectZone({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your state" />
      </SelectTrigger>
      <SelectContent>
        {shippingZones.map((zone) => (
          <SelectGroup key={zone.name}>
            <SelectLabel>{zone.name}</SelectLabel>
            {zone.states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
