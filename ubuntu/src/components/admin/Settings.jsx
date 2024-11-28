import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="store-name">Store Name</Label>
          <Input id="store-name" placeholder="Enter store name" />
        </div>
        <div>
          <Label htmlFor="email">Contact Email</Label>
          <Input id="email" type="email" placeholder="Enter contact email" />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" placeholder="Enter currency (e.g., USD)" />
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
