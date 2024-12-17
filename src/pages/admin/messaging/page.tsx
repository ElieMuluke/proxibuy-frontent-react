import { Mail } from "../../../components/custom/messaging/mail";
import { accounts, mails } from "../../../pages/admin/messaging/data";

export default function MailPage() {
	const layout = localStorage.getItem("react-resizable-panels:layout");
	const collapsed = localStorage.getItem("react-resizable-panels:collapsed");
	const defaultLayout = layout ? JSON.parse(layout) : undefined;
	const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

	return (
		<>
			<div className='hidden flex-col md:flex'>
				{/* <SocketProvider> */}
				<Mail
					accounts={accounts}
					mails={mails}
					defaultLayout={defaultLayout}
					defaultCollapsed={defaultCollapsed}
					navCollapsedSize={4}
				/>
				{/* </SocketProvider> */}
			</div>
		</>
	);
}
