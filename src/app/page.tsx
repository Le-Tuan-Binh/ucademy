import { connectToDatabase } from "@/lib/mongoose";
import Image from "next/image";

export default async function Home() {
	const connect = connectToDatabase();
	return <div>Homepage</div>;
}
