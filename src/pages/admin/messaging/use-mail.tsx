import { useState } from "react";
import { Mail, mails } from "../../../pages/admin/messaging/data";

type Config = {
	selected: Mail["id"] | null;
};

export function useMail() {
	const [mail, setMail] = useState<Config["selected"]>(mails[0].id);

	return [mail, setMail] as const;
}
