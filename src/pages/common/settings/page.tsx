import { Separator } from "../../../components/ui/separator";
import { AccountForm } from "./account/accountForm";

export default function SettingsAccountPage() {
	return (
		<div className='space-y-6'>
			<div>
				<h3 className='text-lg font-medium'>Account</h3>
				<p className='text-sm text-muted-foreground'>
					Mettez a jour vos paramètres de compte.
				</p>
			</div>
			<Separator />
			<AccountForm />
		</div>
	);
}
