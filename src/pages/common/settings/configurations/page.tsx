import { Separator } from "../../../../components/ui/separator";
import { ConfigurationScreen } from "./configurationScreen";

export default function SystemConfigurationPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Configuration</h3>
				<p className='text-sm text-muted-foreground'>
					Personaliser la configuration du systeme.
				</p>
			</div>
			<Separator />
			<ConfigurationScreen />
		</div>
	);
}
