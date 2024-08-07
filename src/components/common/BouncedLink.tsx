import Link from "next/link";
import { IconPlus } from "../icons";

const BouncedLink = ({ url }: { url: string }) => {
	return (
		<Link
			href={url}
			className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 hover:animate-spin"
		>
			<IconPlus className="size-6"></IconPlus>
		</Link>
	);
};

export default BouncedLink;
