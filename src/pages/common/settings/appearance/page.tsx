import { Separator } from "../../../../components/ui/separator";
import { AppearanceForm } from "./appearanceForm";

export default function SettingsAppearancePage() {
	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Appearance</h3>
				<p className='text-sm text-muted-foreground'>
					Personaliser l&apos;apparence de l&apos;application.
				</p>
			</div>
			<Separator />
			<AppearanceForm />
		</div>
	);
}
